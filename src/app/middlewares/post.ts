import express from "express";
import { connection } from "../db";
import { isValidParams } from "../consts";

type TempData = {
  time: string;
  temperature: number;
  humidity: number;
  pressure: number;
  password: string;
};

const isTempData = (body: unknown): body is TempData => {
  if (typeof body !== "object" || body === null) {
    return false;
  }
  return (
    "time" in body &&
    "temperature" in body &&
    "humidity" in body &&
    "pressure" in body &&
    "password" in body
  );
};

export const insert: express.RequestHandler = (req, res, next) => {
  // postのpayloadの形式をチェックする
  const body = req.body;
  if (!isTempData(body)) {
    res.sendStatus(400);
    return;
  }
  // postが正しいパスワードを含んでいるか確認する
  if (body.password !== process.env.TEMPPOST_PASSWORD) {
    res.sendStatus(400);
    return;
  }
  // URLのパラメータの形式をチェックする
  const params = req.params;
  if (!isValidParams(params)) {
    res.sendStatus(400);
    return;
  }

  const { time, password, ...tempData } = body;
  const dateString = `${params.year}-${params.month}-${params.date} ${time}:00`;

  connection.query(
    `insert into temp set ?`,
    { date: dateString, ...tempData },
    (error, results, fields) => {
      console.log(error, results, fields);
    }
  );
  res.send("OK");
  next();
};
