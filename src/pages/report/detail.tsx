import { useEffect, useState } from "react";
import BaseLayout from "../../layouts/base";
import { getBaseUrl } from "@/helpers/api";
import axios from "axios";
import { OrderProps } from "@/types/stuff";

const DetailReport = () => {
  const startDate = window.location.href.split("/")[4];
  const endDate = window.location.href.split("/")[5];

  const [orders, setOrders] = useState<OrderProps[]>([]);

  const getMonth = () => {
    const startDateMonth = new Date(startDate).getMonth();
    const endDateMonth = new Date(endDate).getMonth();
    const monthList = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    if (startDateMonth === endDateMonth) {
      return monthList[startDateMonth];
    } else {
      return `${monthList[startDateMonth]} - ${monthList[endDateMonth]}`;
    }
  };

  const getOrderByDate = async () => {
    const startDate = window.location.href.split("/")[4];
    const endDate = window.location.href.split("/")[5];
    axios
      .post(`${getBaseUrl()}/report/private/date`, {
        start_date: startDate,
        end_date: endDate,
      })
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.data);
        // countProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const countProduct = async (resp: ResReport) => {
  // const inc: StuffProps[] = resp.in || [];
  // const out: OutProps[] = resp.out || [];
  // const retur: ReturProps[] = resp.rtr || [];

  // for (let i = 0; i < inc.length; i++) {
  //   let total = inc[i].quantity;
  //   for (let j = 0; j < out.length; j++) {
  //     if (inc[i].id_stuff === out[j].order.stock.id_stuff) {
  //       total -= out[j].order.total_order;
  //     }
  //   }
  //   for (let k = 0; k < retur.length; k++) {
  //     if (inc[i].id_stuff === retur[k].stock.id_stuff) {
  //       total += retur[k].total_return;
  //     }
  //   }
  //   inc[i].quantity = total;
  // }
  //   setOrders(inc);
  // };

  const fetchData = async () => {
    getOrderByDate();
    getMonth();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BaseLayout>
        <div className="flex flex-col bg-gray-100 rounded-md shadow-md m-6 text-center">
          <h1 className="text-3xl font-semibold">
            Laporan Stock Opname Bulan {getMonth()}
          </h1>
          <h1>
            {"Tanggal, "}
            {startDate} - {endDate}
          </h1>
          <h6 className="font-semibold text-lg py-1">TOKO ASSYARIF</h6>
          {orders.length === 0 ? (
            <h1 className="text-2xl font-semibold mt-8">Tidak ada data</h1>
          ) : (
            <table className="m-8 border border-gray-400">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
                >
                  <td className="p-2">
                    Nama: {order.name} <br />
                    Tipe: {order.type} <br />
                    Total Orang: {order.total_people} <br />
                    Total Hari: {order.total_day} <br />
                    Harga: {order.price} <br />
                    Total Harga: {order.total_price} <br />
                    Telepon: {order.phone} <br />
                  </td>
                </tr>
              ))}
            </table>
          )}
        </div>
      </BaseLayout>
    </>
  );
};

export default DetailReport;
