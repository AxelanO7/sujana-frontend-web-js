import { HomeIcon } from "@heroicons/react/20/solid";
import BaseLayout from "../../layouts/base";
import { useState } from "react";
import { getBaseUrl } from "../../helpers/api";
import axios from "axios";
import Swal from "sweetalert2";
import { Input } from "@/shadcn/components/ui/input";

const Ordering = () => {
  const dateNow = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const [orderId, setOrderId] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [phone, setPhone] = useState("");
  const [people, setPeople] = useState(0);
  const [price, setPrice] = useState(0);
  const [day, setDay] = useState(0);
  const [total, setTotal] = useState(0);

  const submitIn = () => {
    const payload = {
      order_id: orderId,
      name: name,
      type: type,
      phone: phone,
      total_people: people,
      total_day: day,
      price: price,
      total_price: total,
    };

    console.log(payload);

    axios
      .post(`${getBaseUrl()}/order/public/package`, payload)
      .then((res) => {
        console.log(res);
        resetForm();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Data berhasil disimpan",
        });
        // todo
        // window.location.href = "/order";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetForm = () => {
    setOrderId("");
    setName("");
    setType("");
    setPhone("");
    setPeople(0);
    setTotal(0);
    setPrice(0);
    setDay(0);
  };

  const updateTotal = (val: number, type: string) => {
    if (type === "people") {
      setTotal(val * price * day);
    } else if (type === "day") {
      setTotal(val * price * people);
    } else if (type === "price") {
      setTotal(val * day * people);
    }
  };

  return (
    <>
      <BaseLayout>
        <h1 className="text-3xl font-bold mx-6 pt-4">Pesanan</h1>
        <div className="flex items-center bg-gray-300 px-6 py-2">
          <HomeIcon className="w-5 h-5" />
          <p className="ml-2 font-semibold">Pesanan</p>
          {/* <p className="ml-2 font-semibold">{">"}</p>
          <p className="ml-2 font-semibold">Tambah Pesanan</p> */}
        </div>
        <div className="px-6">
          <div className="mt-4 bg-gray-200 px-8 py-8 rounded-md shadow-md">
            <div className="flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-500">Pesanan</h3>
              <h6 className="font-semibold text-lg py-1">{dateNow}</h6>
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="w-full">
                <label>ID Pesanan</label>
                <Input onChange={(e) => setOrderId(e.target.value)} />
              </div>
              <div className="w-full">
                <label>Nama Pesanan</label>
                <Input onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="w-full">
                <label>Jenis Pesanan</label>
                <select
                  onChange={(e) => setType(e.target.value)}
                  className="p-2 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full bg-slate-50"
                >
                  <option value="pembelian">Pembelian</option>
                  <option value="penjualan">Penjualan</option>
                  <option value="Pesanan">Pesanan</option>
                </select>
              </div>
              <div className="w-full">
                <label>Telepon</label>
                <Input onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <div className="w-full">
                <label>Jumlah Orang</label>
                <Input
                  type="number"
                  onChange={(e) => {
                    setPeople(parseInt(e.target.value));
                    updateTotal(parseInt(e.target.value), "people");
                  }}
                />
              </div>
              <div className="w-full flex flex-col">
                <label>Hari</label>
                <Input
                  type="number"
                  onChange={(e) => {
                    setDay(parseInt(e.target.value));
                    updateTotal(parseInt(e.target.value), "day");
                  }}
                />
              </div>
              <div className="w-full">
                <label>Harga</label>
                <Input
                  type="number"
                  onChange={(e) => {
                    setPrice(parseInt(e.target.value));
                    updateTotal(parseInt(e.target.value), "price");
                  }}
                />
              </div>
              <div className="w-full">
                <label>Harga Sub Total</label>
                <Input
                  value={total.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                  disabled
                  className="w-full"
                />
              </div>
            </div>
            <div className="w-full justify-end flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={submitIn}
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

export default Ordering;
