import { HomeIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "../../helpers/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrderProps } from "../../types/stuff";
import Swal from "sweetalert2";

const ListOrder = () => {
  const [stocks, setStocks] = useState<OrderProps[]>([]);

  const baseUrl = () => {
    return getBaseUrl();
  };

  const getOrders = () => {
    axios
      .get(`${baseUrl()}/order/public/package`)
      .then((res) => {
        console.log(res.data);
        setStocks(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addIn = () => {
    window.location.href = "/in/add";
  };

  // const editIn = (id: number) => {
  //   window.location.href = `/in/${id}`;
  // };

  // const handleTapDetail = async (id: number) => {
  //   await axios
  //     .get(`${baseUrl()}/stuff/in/${id}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       const data: StuffProps = res.data.data;
  //       Swal.fire({
  //         title: "Detail Barang",
  //         html: `
  //           <div class="text-left">
  //             <p><span class="font-semibold">ID Barang:</span> ${
  //               data.id_stuff
  //             }</p>
  //             <p><span class="font-semibold">Nama:</span> ${data.name}</p>
  //             <p><span class="font-semibold">Jenis:</span> ${data.type}</p>
  //             <p><span class="font-semibold">Jumlah:</span> ${data.quantity}</p>
  //             <p><span class="font-semibold">Satuan:</span> ${data.unit}</p>
  //             <p><span class="font-semibold">Harga:</span> ${data.price.toLocaleString(
  //               "id-ID",
  //               {
  //                 style: "currency",
  //                 currency: "IDR",
  //               }
  //             )}</p>
  //           </div>
  //         `,
  //         confirmButtonColor: "#3085d6",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           console.log("OK");
  //         }
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleDeleteIn = (id: number) => {
  //   Swal.fire({
  //     title: "Apakah Anda yakin?",
  //     text: "Data yang dihapus tidak dapat dikembalikan!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Ya, hapus!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteStuff(id);
  //     }
  //   });
  // };

  // const deleteStuff = (id: number) => {
  //   axios
  //     .delete(`${baseUrl()}/stuff/in/${id}`)
  //     .then((res) => {
  //       Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
  //       getIns();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       Swal.fire("Gagal!", "Data gagal dihapus.", "error");
  //     });
  // };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Masuk</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Masuk</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <h3 className="text-3xl font-semibold text-gray-500">
              Barang Masuk
            </h3>
            <div className="flex justify-between mt-4">
              <div className="flex space-x-4 text-base font-semibold text-white">
                <button
                  className="bg-c-dark-blue rounded-md px-3"
                  onClick={addIn}
                >
                  Tambah Barang
                </button>
                <button className="bg-c-yellow rounded-md px-3">
                  Cetak Laporan
                </button>
              </div>
              <div className="flex items-center">
                <input
                  type="search"
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Cari barang"
                />
                <MagnifyingGlassIcon className="w-10 h-10 text-white bg-c-dark-blue rounded-md p-2 ml-2 cursor-pointer" />
              </div>
            </div>
            <table className="w-full mt-4">
              <thead>
                <tr>
                  <th className="border-2 border-gray-300 p-2">ID Barang</th>
                  <th className="border-2 border-gray-300 p-2">Tanggal</th>
                  <th className="border-2 border-gray-300 p-2">Nama</th>
                  <th className="border-2 border-gray-300 p-2">Jenis</th>
                  <th className="border-2 border-gray-300 p-2">Jumlah</th>
                  <th className="border-2 border-gray-300 p-2">Satuan</th>
                  <th className="border-2 border-gray-300 p-2">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-center text-gray-700">
                {stocks.length === 0 ? (
                  <tr>
                    <td colSpan={7}>Data tidak ditemukan</td>
                  </tr>
                ) : (
                  stocks.map((stock) => (
                    <tr key={stock.id}>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.order_id}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {new Date(
                          stock.created_at?.toString() || new Date()
                        ).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.name}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.type}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.type}
                      </td>
                      <td className="border-2 border-gray-300 p-2">
                        {stock.price.toLocaleString("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        })}
                      </td>
                      <td className="border-2 border-gray-300 flex space-x-2 text-white p-2 font-semibold">
                        <button
                          className="bg-blue-500 rounded-md w-full p-1"
                          // onClick={() => editIn(stock.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-green-500 rounded-md w-full p-1"
                          // onClick={() => handleTapDetail(stock.id)}
                        >
                          Detail
                        </button>
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
