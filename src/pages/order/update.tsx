import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useEffect, useState } from "react";
import axios from "axios";
import { getBaseUrl } from "../../helpers/api";
import Swal from "sweetalert2";
import { OrderProps } from "@/types/stuff";
import { Input } from "@/shadcn/components/ui/input";

const UpdateOrder = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const idParam = window.location.pathname.split("/")[2];

  const [formState, setFormState] = useState({
    id: 0,
    order_id: "",
    name: "",
    type: "",
    phone: "",
    total_day: 0,
    total_people: 0,
    total_price: 0,
    price: 0,
  });

  const initialFormState = (order: OrderProps) => {
    setFormState({
      id: parseInt(idParam),
      order_id: order.order_id,
      name: order.name,
      type: order.type,
      phone: order.phone,
      price: order.price,
      total_day: order.total_day,
      total_people: order.total_people,
      total_price: order.total_price,
    });
  };

  const getOrder = (idParam: string) => {
    axios
      .get(`${getBaseUrl()}/order/public/package/${idParam}`)
      .then((res) => {
        const resData: OrderProps = res.data.data;
        initialFormState(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTotal = (val: number, type: string) => {
    let total = 0;
    if (type === "people") total = val * formState.total_day * formState.price;
    else if (type === "day")
      total = val * formState.total_people * formState.price;
    else if (type === "price")
      total = val * formState.total_day * formState.total_people;
    setFormState({ ...formState, total_price: total });
  };

  const handleTapSubmit = () => {
    axios
      .put(`${getBaseUrl()}/order/public/package/${idParam}`, formState)
      .then(async (res) => {
        console.log(res);
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil diubah",
          icon: "success",
          confirmButtonText: "Ok",
        });
        window.location.href = "/order";
      })
      .catch((err) => {
        Swal.fire({
          title: "Gagal",
          text: "Data gagal diubah",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.log(err);
      });
  };

  useEffect(() => {
    getOrder(idParam);
  }, []);

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Barang Masuk</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Barang Masuk</p>
          <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Ubah Barang</p>
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">
                Barang Masuk
              </h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="w-full">
                <label>ID Pesanan</label>
                <Input
                  defaultValue={formState.order_id}
                  onChange={(e) =>
                    setFormState({ ...formState, order_id: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label>Nama Pesanan</label>
                <Input
                  defaultValue={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                />
              </div>
              <div className="w-full">
                <label>Jenis Pesanan</label>
                <select
                  defaultValue={formState.type}
                  onChange={(e) =>
                    setFormState({ ...formState, type: e.target.value })
                  }
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                >
                  <option value="pembelian">Pembelian</option>
                  <option value="penjualan">Penjualan</option>
                  <option value="Pesanan">Pesanan</option>
                </select>
              </div>
              <div className="w-full">
                <label>Telepon</label>
                <Input
                  defaultValue={formState.phone}
                  onChange={(e) =>
                    setFormState({ ...formState, phone: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="w-full">
                <label>Jumlah Orang</label>
                <Input
                  type="number"
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      total_people: parseInt(e.target.value),
                    });
                    updateTotal(parseInt(e.target.value), "people");
                  }}
                />
              </div>
              <div className="w-full flex flex-col">
                <label>Hari</label>
                <Input
                  type="number"
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      total_day: parseInt(e.target.value),
                    });
                    updateTotal(parseInt(e.target.value), "day");
                  }}
                />
              </div>
              <div className="w-full">
                <label>Harga</label>
                <Input
                  type="number"
                  onChange={(e) => {
                    setFormState({
                      ...formState,
                      price: parseInt(e.target.value),
                    });
                    updateTotal(parseInt(e.target.value), "price");
                  }}
                />
              </div>
              <div className="w-full">
                <label>Harga Sub Total</label>
                <Input
                  value={formState.total_price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                  disabled
                />
              </div>
            </div>
            <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={handleTapSubmit}
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

export default UpdateOrder;
