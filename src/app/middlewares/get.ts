import express from "express";
import { isValidParams } from "../consts";
import { connection } from "../db";

// 2000-05-17T11:45:00.000Z を 11:45:00 にする
export const dateTimeToTime = (dateTime: Date): string => {
  return dateTime.toISOString().split("T")[1].split(".")[0];
};

export const select: express.RequestHandler = (req, res, next) => {
  const params = req.params;
  if (!isValidParams(params)) {
    res.sendStatus(400);
    return;
  }

  const startDateString = `${params.year}-${params.month}-${params.date} 00:00`;
  const endDateString = `${params.year}-${params.month}-${params.date} 23:59`;

  connection.query(
    `select * from temp where date between "${startDateString}" and "${endDateString}" order by \`date\``,
    (error, results, fields) => {
      if (error) {
        console.error(error);
      }
      res.status(200).json({
        status: "200",
        data: results.map((result: any) => ({
          ...result,
          time: dateTimeToTime(result.date),
        })),
      });
    }
  );
};
