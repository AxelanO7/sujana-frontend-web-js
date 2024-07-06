import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "../../helpers/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrderProps } from "../../types/stuff";
import Swal from "sweetalert2";
import { Input } from "@/shadcn/components/ui/input";
import { Button } from "@/shadcn/components/ui/button";

const ListOrder = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const getOrders = () => {
    axios
      .get(`${getBaseUrl()}/order/public/package`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleTapAdd = () => {
    window.location.href = "/ordering";
  };

  const handleTapEdit = (id: number) => {
    window.location.href = `/order/${id}`;
  };

  const handleTapDelete = (id: number) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOrder(id);
      }
    });
  };

  const deleteOrder = (id: number) => {
    axios
      .delete(`${getBaseUrl()}/order/public/package/${id}`)
      .then(() => {
        Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
        getOrders();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Gagal!", "Data gagal dihapus.", "error");
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Data Pemesanan</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Data Pemesanan</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Data Pemesanan
            </h3>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-4 text-base font-semibold text-white">
                <Button
                  className="bg-c-dark-blue rounded-md px-3"
                  onClick={handleTapAdd}
                >
                  Tambah Barang
                </Button>
                <Button className="bg-c-yellow rounded-md px-3">
                  Cetak Laporan
                </Button>
              </div>
              <div className="flex items-center">
                <Input type="text" placeholder="Cari..." />
                <MagnifyingGlassIcon className="w-10 h-9 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer" />
              </div>
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">ID</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">Jenis</th>
                  <th className="border-2 border-gray-300 p-2">Jumlah Orang</th>
                  <th className="border-2 border-gray-300 p-2">Jumlah Hari</th>
                  <th className="border-2 border-gray-300 p-2">Harga</th>
                  <th className="border-2 border-gray-300 p-2">Total Harga</th>
                  <th className="border-2 border-gray-300 p-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={7}>Data tidak ditemukan</td>
                  </tr>
                ) : (
                  orders.map((stock) => (
                    <tr key={stock.id}>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.order_id}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.name}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.type}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.total_people}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.total_day}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.total_price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="border-2 border-gray-300 flex space-x-2 text-white p-2 font-semibold">
                        <Button
                          className="bg-blue-500 rounded-md w-full p-1"
                          onClick={() => handleTapEdit(stock.id!)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 rounded-md w-full p-1"
                          onClick={() => handleTapDelete(stock.id!)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </BaseLayout>
    </>
  );
};

export default ListOrder;
