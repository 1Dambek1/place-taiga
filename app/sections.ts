// "use server";

// export async function submitCareerForm(formData: FormData) {
//   const name = formData.get("name") as string;
//   const phone = formData.get("phone") as string;

//   if (!name || !phone) return { error: "Заполните поля" };

//   // Берем данные из переменных окружения
//   const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
//   const GROUP_CHAT_ID = process.env.TELEGRAM_GROUP_ID;

//   // Проверка на случай, если забыл прописать переменные в .env
//   if (!BOT_TOKEN || !GROUP_CHAT_ID) {
//     console.error("Ошибка конфигурации: Переменные окружения не заданы");
//     return { error: "Ошибка сервера" };
//   }

//   const text = `
// 🌲 <b>НОВАЯ ЗАЯВКА В ГРУППУ</b>
// 👤 <b>Имя:</b> ${name}
// 📞 <b>Тел:</b> <code>${phone}</code>
//   `.trim();

//   try {
//     const response = await fetch(
//       `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           chat_id: GROUP_CHAT_ID,
//           text: text,
//           parse_mode: "HTML",
//         }),
//       },
//     );

//     if (!response.ok) throw new Error("Telegram API error");

//     return { success: true };
//   } catch (e) {
//     console.error(e);
//     return { error: "Ошибка при отправке" };
//   }
// }
