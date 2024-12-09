import axios from "axios";
import { useEffect, useState } from "react";
import swal from "sweetalert2";
import { getBaseUrl } from "../../helpers/api";
import { Button } from "@nextui-org/button";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateInput = () => {
    if (!username) {
      swal.fire("Gagal!", "Nama tidak boleh kosong", "error");
      return false;
    }

    if (!password) {
      swal.fire("Gagal!", "Password tidak boleh kosong", "error");
      return false;
    }
    return true;
  };

  const handleRegister = () => {
    window.location.href = "/register";
  };

  const handleLogin = async () => {
    if (!validateInput()) {
      return;
    }
    axios
      .post(
        `
        ${getBaseUrl()}/account/public/login`,
        {
          username: username,
          password: password,
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.data.role);
        swal.fire("Berhasil!", "Anda berhasil masuk", "success").then(() => {
          window.location.href = "/";
        });
      })
      .catch(() => {
        swal.fire(
          "Gagal!",
          "Kredensial yang Anda masukkan salah. Silakan coba lagi.",
          "error"
        );
      });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-gray-50 w-screen min-h-screen">
        <h1 className="text-4xl font-bold">Sujana Tour & Travel</h1>
        <div className="shadow-md p-4 rounded-md w-96 mt-4 bg-c-powder-blue flex flex-col">
          <h3 className="text-xl font-bold mb-4">Login</h3>
          <input
            className="border border-gray-300 rounded-md p-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="border border-gray-300 rounded-md p-2 mt-4"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-end items-center mt-4">
            {/* <div className="flex">
              <input
                type="checkbox"
                className="border border-gray-300 rounded-md"
              />
              <p className="ml-2">Ingatkan Saya</p>
            </div> */}
            <Button onClick={handleRegister} variant="faded">
              Daftar
            </Button>
            <div className="w-4" />
            <Button onClick={handleLogin} variant="faded">
              Masuk
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
