import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

function App() {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram.WebApp;

    // Убедитесь, что API доступен
    if (tg) {
      tg.ready();

      // Логируем для проверки, что есть в initDataUnsafe
      console.log("initDataUnsafe:", tg.initDataUnsafe);

      const userData = tg.initDataUnsafe?.user as TelegramUser;

      if (userData) {
        setUser(userData); // Устанавливаем данные пользователя
      } else {
        console.error("Данные пользователя не найдены.");
      }
    } else {
      console.error("Telegram WebApp API не доступен.");
    }
  }, []);

  // Функция для отправки данных боту
  const sendDataToBot = () => {
    const tg = (window as any).Telegram.WebApp;
    tg.sendData(
      JSON.stringify({
        message: "Hello from React with TypeScript and Tailwind!",
      })
    );
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold mb-4 text-black'>
        Welcome to Telegram MiniApp!
      </h1>
      {user ? (
        <>
          <p className='text-lg mb-4'>
            Hello, {user.first_name} {user.last_name}!
          </p>
          <button
            onClick={sendDataToBot}
            className='px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600'
          >
            Send Message to Bot
          </button>
        </>
      ) : (
        <p className='text-lg'>Loading user data...</p>
      )}
    </div>
  );
}

export default App;
