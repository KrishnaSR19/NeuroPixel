import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions';
import type { WebhookEvent, UserJSON, DeletedObjectJSON } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req) as WebhookEvent;
    const eventType = evt.type;

    // CREATE
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
        await clerkClient.users.updateUserMetadata(data.id, {
          publicMetadata: { userId: newUser._id },
        });
      }

      return NextResponse.json({ message: 'User created', user: newUser });
    }

    // UPDATE
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

    // DELETE
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
    console.error('Error verifying webhook:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
}
