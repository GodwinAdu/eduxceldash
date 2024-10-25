import Heading from '@/components/commons/heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { countAllUsers, getActiveUsersForCurrentMonth, getSignInsForCurrentMonth, getSignUpsForCurrentMonth } from '@/lib/actions/user.actions';
import { getFormattedMonthYear } from '@/lib/utils';
import React from 'react';

const page = async () => {
  const allUsers = await countAllUsers() || 0;
  const activeUsers = await getActiveUsersForCurrentMonth() || 0;
  const signUpUsers = await getSignUpsForCurrentMonth() || 0;
  const signInUsers = await getSignInsForCurrentMonth() || 0;

  const currentMonth = getFormattedMonthYear();

  return (
    <>
      <div className="px-4 py-6">
        <Heading title="Overview" description="View all activities for the current month" />
      </div>
      <Separator />

      {/* Cards for general overview */}
      <div className="py-6 px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <CardTitle>Total Servers</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold">{allUsers}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <CardTitle>Total Channels</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold">{activeUsers}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <CardTitle>Total Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold">{signInUsers}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <CardHeader>
              <CardTitle>Total Files</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-semibold">{signUpUsers}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed User Activity */}
      <div className="py-6 px-4 md:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>User Activity for {currentMonth}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">All Users</h3>
              <p className="text-gray-500">All time</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{allUsers}</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Active Users</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{activeUsers}</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Sign-in Users</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{signInUsers}</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Sign-up Users</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{signUpUsers}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Detailed User Activity */}
      <div className="py-6 px-4 md:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle>Assignments Details {currentMonth}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">All Assignments</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{allUsers}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Pending Assignments</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{allUsers}</p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Confirmed Assignments</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{allUsers}</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Completed Assignments</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{activeUsers}</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Canceled Assignment</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{signInUsers}</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-700">Payed Assignments</h3>
              <p className="text-gray-500">{currentMonth}</p>
              <p className="text-2xl font-semibold text-gray-800 py-2">{signUpUsers}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default page;
