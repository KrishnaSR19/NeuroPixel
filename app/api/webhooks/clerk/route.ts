import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { NextRequest, NextResponse } from 'next/server';
import type { UserJSON, DeletedObjectJSON } from '@clerk/backend';

import { createUser, deleteUser, updateUser } from '@/lib/actions/user.actions';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    // Handle user.created
    if (eventType === 'user.created') {
      const data = evt.data as UserJSON;

      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = data;

      const user = {
        clerkId: id,
        email: email_addresses?.[0]?.email_address ?? '',
        username: username ?? '',
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        photo: image_url ?? '',
      };

      const newUser = await createUser(user);

      if (newUser) {
        await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: { userId: newUser._id },
        });
      }

      return NextResponse.json({ message: 'User created', user: newUser });
    }

    // Handle user.updated
    if (eventType === 'user.updated') {
      const data = evt.data as UserJSON;

      const {
        id,
        image_url,
        first_name,
        last_name,
        username,
      } = data;

      const user = {
        firstName: first_name ?? '',
        lastName: last_name ?? '',
        username: username ?? '',
        photo: image_url ?? '',
      };

      const updatedUser = await updateUser(id, user);

      return NextResponse.json({ message: 'User updated', user: updatedUser });
    }

    // Handle user.deleted
    if (eventType === 'user.deleted') {
      const data = evt.data as DeletedObjectJSON;

      const { id } = data;

      if (!id) {
        console.error('Missing user ID in deleted event');
        return new Response('Missing ID in user.deleted', { status: 400 });
      }

      const deletedUser = await deleteUser(id);

      return NextResponse.json({ message: 'User deleted', user: deletedUser });
    }

    // Handle unknown event types
    console.log(`Unhandled event type: ${eventType}`);
    return new Response('Unhandled event type', { status: 200 });

  } catch (err) {
    console.error(' Webhook verification failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
}
