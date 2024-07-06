import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import { getBaseUrl } from "@/helpers/api";
import { UserProps } from "@/types/user";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const [user, setUser] = useState<UserProps>({
    id: "",
    name: "",
    address: "",
    phone: "",
    id_account: 0,
  });
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const getUser = (id: number) => {
    axios
      .get(`${getBaseUrl()}/user/private/account/${id}`)
      .then((res) => {
        const data = res.data.data;
        setUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateUser = () => {
    const id = window.location.pathname.split("/")[2];
    const intId = parseInt(id);

    axios
      .put(`${getBaseUrl()}/user/private/account/${intId}`, {
        id: parseInt(user.id),
        name: user.name,
        phone: user.phone,
        address: user.address,
        id_account: user.id_account,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "Berhasil",
          text: "Berhasil mengubah data",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.href = "/user";
        });
      })
      .catch((err) => {
        console.error(err);
        Swal.fire({
          title: "Gagal",
          text: "Gagal mengubah data",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    const intId = parseInt(id);
    getUser(intId);
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">User</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">User</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Ubah Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">User</h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div>
                <label>ID User</label>
                <input
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-gray-100"
                  value={user.id}
                  disabled
                />
              </div>
              <div>
                <label>Nama User</label>
                <input
                  defaultValue={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label>No Telepon</label>
                <input
                  defaultValue={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
              <div>
                <label>Alamat</label>
                <input
                  defaultValue={user.address}
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
              </div>
            </div>
            <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleUpdateUser}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default UpdateUser;
