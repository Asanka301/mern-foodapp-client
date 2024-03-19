import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";

function ManageBookings() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/all");
      return res.data;
    },
  });
  console.log(orders);

  const handleConfirm = async (item) => {
    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Payment Confirmed!",
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between m-4 w-full md:w-[870px] px-4 mx-auto">
        <h2 className="text-2xl font-semibold my-4">
          Manage All <span className="text-orange-500">Bookings</span>
        </h2>
        <h5>Total Orders: {orders.length}</h5>
      </div>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs md:w-[870px]">
            {/* head */}
            <thead className="bg-orange-500 text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transaction ID</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.email}</td>
                  <td>{item.transitionId}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                  <td className="text-center">
                    {item.status === "confirmed" ? (
                      <button className="btn btn-xs btn-circle bg-green  text-white">
                        <FaCheck />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConfirm(item)}
                        className="btn btn-xs btn-circle bg-orange-500 text-white"
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>

                  <td>
                    <button className="btn btn-xs bg-red text-white">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageBookings;
