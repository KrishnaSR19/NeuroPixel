import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions';
import type { WebhookEvent, UserJSON, DeletedObjectJSON } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    console.log(" Clerk Webhook route hit");

    const evt = await verifyWebhook(req) as WebhookEvent;
    const eventType = evt.type;
    console.log(` Webhook verified: ${eventType}`);

    if (eventType === 'user.created') {
      const data = evt.data as UserJSON;

      const user = {
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address ?? '',
        username: data.username ?? data.email_addresses?.[0]?.email_address?.split('@')[0] ?? '',
        firstName: data.first_name ?? '',
        lastName: data.last_name ?? '',
        photo: data.image_url ?? '',
      };

      const newUser = await createUser(user);

      if (newUser) {
        // Retry to avoid Clerk 404 errors when updating metadata
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await clerkClient.users.updateUserMetadata(data.id, {
          publicMetadata: { userId: newUser._id },
        });
        console.log(' Clerk metadata updated');
      }

      return NextResponse.json({ message: 'User created', user: newUser });
    }

    if (eventType === 'user.updated') {
      const data = evt.data as UserJSON;

      const user = {
        firstName: data.first_name ?? '',
        lastName: data.last_name ?? '',
        username: data.username ?? '',
        photo: data.image_url ?? '',
      };

      const updatedUser = await updateUser(data.id, user);
      return NextResponse.json({ message: 'User updated', user: updatedUser });
    }

    if (eventType === 'user.deleted') {
      const data = evt.data as DeletedObjectJSON;

      if (!data.id) {
        return NextResponse.json({ message: 'No user ID provided for deletion' }, { status: 400 });
      }

      const deletedUser = await deleteUser(data.id);
      return NextResponse.json({ message: 'User deleted', user: deletedUser });
    }

    return new Response('Unhandled event type', { status: 200 });
  } catch (err) {
    console.error(' Webhook verification or handling failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
}
