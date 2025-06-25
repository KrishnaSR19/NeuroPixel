import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest, NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

import { createUser, updateUser, deleteUser } from '@/lib/actions/user.actions';
import type { WebhookEvent, UserJSON, DeletedObjectJSON } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    console.log('✅ Clerk Webhook route hit');

    const evt = await verifyWebhook(req) as WebhookEvent;
    console.log('🔐 Webhook verified:', evt.type);

    const eventType = evt.type;

    // CREATE
    if (eventType === 'user.created') {
      const data = evt.data as UserJSON;
      console.log('📥 user.created payload:', data);

      const user = {
        clerkId: data.id,
        email: data.email_addresses?.[0]?.email_address ?? '',
        username: data.username ?? data.email_addresses?.[0]?.email_address?.split('@')[0] ?? '',
        firstName: data.first_name ?? '',
        lastName: data.last_name ?? '',
        photo: data.image_url ?? '',
      };

      console.log('📤 Creating user in DB:', user);
      const newUser = await createUser(user);

      if (newUser) {
        console.log('✅ User created in DB:', newUser);
        await clerkClient.users.updateUserMetadata(data.id, {
          publicMetadata: { userId: newUser._id },
        });
        console.log('🔄 Clerk metadata updated');
      }

      return NextResponse.json({ message: 'User created', user: newUser });
    }

    // UPDATE
    if (eventType === 'user.updated') {
      const data = evt.data as UserJSON;
      console.log('✏️ user.updated payload:', data);

      const user = {
        firstName: data.first_name ?? '',
        lastName: data.last_name ?? '',
        username: data.username ?? '',
        photo: data.image_url ?? '',
      };

      console.log('📤 Updating user in DB:', user);
      const updatedUser = await updateUser(data.id, user);
      return NextResponse.json({ message: 'User updated', user: updatedUser });
    }

    // DELETE
    if (eventType === 'user.deleted') {
      const data = evt.data as DeletedObjectJSON;
      console.log('❌ user.deleted payload:', data);

      if (!data.id) {
        console.warn('⚠️ No user ID in deleted event');
        return NextResponse.json({ message: 'No user ID provided for deletion' }, { status: 400 });
      }

      console.log('📤 Deleting user from DB with ID:', data.id);
      const deletedUser = await deleteUser(data.id);
      return NextResponse.json({ message: 'User deleted', user: deletedUser });
    }

    console.log('ℹ️ Unhandled event type:', eventType);
    return new Response('Unhandled event type', { status: 200 });

  } catch (err) {
    console.error('❌ Webhook verification or handling failed:', err);
    return new Response('Webhook verification failed', { status: 400 });
  }
}
