# sharex-uploader-server
Просто веб-сервер на express для загрузки скриншотов через программу ShareX

### Установка и настройка
 
- Склонируйте репозиторий и установите зависимости
```
git clone https://github.com/MrLivixx/sharex-uploader-server.git
npm i
```
- Смените название файла .env.example на .env и подставьте свои значения
<br>Пример:
```
PORT=1000
KEY=mrlivixx
DOMAIN=https://imgs.mrlivixx.me
```

- После этого скомпилируйте и запустите проект
```
npm run build
npm start
```

### Настройка ShareX
Для настройки загрузки скриншотов из [ShareX](https://getsharex.com) вам нужно выполнить следующие действия:

1. Откройте саму программу и выберите "Сервисы загрузок" и затем "Настройки пользовательских сервисов"
![](https://imgs.mrlivixx.me/ShareX_GBbYnqhvYy.png)
2. Нажмите на Импорт и "Из буфера" и вставьте данный код:
```json
{
   "Version": "14.1.0",
   "Name": "test",
   "DestinationType": "ImageUploader",
   "RequestMethod": "POST",
   "RequestURL": "http://localhost:1000/upload",
   "Body": "MultipartFormData",
   "Arguments": {
      "key": "KEY"
   },
   "FileFormName": "file",
   "URL": "{json:url}",
   "DeletionURL": "{json:delete}",
   "ErrorMessage": "{json:error}"
}
```
После этого смените домен на свой в поле URL и установите свой ключ в разделе "Тело" и в графе "Key"
![](https://imgs.mrlivixx.me/ShareX_BrFQZaDRh0.png)

3. Установите в этом же окне в "Сервисы загрузки картинок" ваш сервис и нажмите на "Тест", после этого программа должна отправить на сервер картинку и в ответе у вас должно быть `URL: http://вашдомен/Test.png` если же такого ответа нет то проверяйте всё ли вы правильно сделали, если вы уже всё проверили и не работает, то ждём вас [здесь](https://github.com/MrLivixx/sharex-uploader-server/issues)
   <br> И не забываем в настройках установить сервис загрузки как пользовательский. 
   ![](https://imgs.mrlivixx.me/022992504210207.png)
   
# Contributing
Мы приветствуем всех желающих которые хотят внести вклад в данный проект.
