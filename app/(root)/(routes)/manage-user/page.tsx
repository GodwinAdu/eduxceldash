import React from 'react'
import Heading from '@/components/commons/heading'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/table/DataTable'
import { columns } from './_components/column'
import { getAllUsers } from '@/lib/actions/user.actions'

const page = async () => {

  const users = await getAllUsers();
  console.log(users)
  return (
    <>
    <div className="">
        <Heading title='Users' description='Manage all Users' />
    </div>
    <Separator />
    <div className="py-4 px-4">
      <DataTable searchKey='fullName' columns={columns} data={users} />
    </div>
    </>
  )
}

export default page
