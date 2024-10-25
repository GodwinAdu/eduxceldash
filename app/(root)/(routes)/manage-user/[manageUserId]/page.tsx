import { fetchUserById } from '@/lib/actions/user.actions';
import React from 'react'
import UserDetail from '../_components/UserDetails';

const page = async ({ params }: { params: { manageUserId: string } }) => {
    const userId = params.manageUserId as string;
    const user = await fetchUserById(userId);
    return (
      <>
      <UserDetail user={user} />
      </>
    )
}

export default page
