import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import axios from "axios";
import { getBaseUrl } from "@/helpers/api";
import { useEffect, useState } from "react";
import { UserProps } from "@/types/user";
import Swal from "sweetalert2";

const ListUser = () => {
  const [users, setUsers] = useState<UserProps[]>([]);

  const getEmployees = () => {
    axios
      .get(`${getBaseUrl()}/user/private/account`)
      .then((res) => {
        const data = res.data.data;
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddEmployee = () => {
    window.location.href = "/user/add";
  };

  const handleEditEmployee = (id: number) => {
    window.location.href = `/user/${id}`;
  };

  const handleDeleteEmployee = (id: number) => {
    deleteEmployee(id);
  };

  const deleteEmployee = (id: number) => {
    axios
      .delete(`${getBaseUrl()}/user/private/account/${id}`)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Berhasil",
          text: "Berhasil menghapus data",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          getEmployees();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">User</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Tambah User</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">Data User</h3>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-4">
                <button
                  className="bg-c-dark-blue rounded-md px-3 text-white"
                  onClick={handleAddEmployee}
                >
                  Tambah User
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="search"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cari User"
                />
                <MagnifyingGlassIcon className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer" />
              </div>
            </div>

            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">No</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">No Telepon</th>
                  <th className="border-2 border-gray-300 p-2">Alamat</th>
                  <th className="border-2 border-gray-300 p-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="border-2 border-gray-300 p-2">
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
                {users.map((employee, index) => (
                  <tr key={employee.id}>
                    <td className="border-2 border-gray-300 p-2">
                      {index + 1}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {employee.name}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {employee.phone}
                    </td>
                    <td className="border-2 border-gray-300 p-2">
                      {employee.address}
                    </td>
                    <td className="border-2 border-gray-300 flex space-x-2 text-white p-2">
                      <button
                        className="bg-blue-500 rounded-md w-full p-1"
                        onClick={() =>
                          handleEditEmployee(parseInt(employee.id))
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 rounded-md w-full p-1"
                        onClick={() =>
                          handleDeleteEmployee(parseInt(employee.id))
                        }
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default ListUser;
