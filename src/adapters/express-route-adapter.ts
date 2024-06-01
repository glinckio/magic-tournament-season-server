import { Request, Response } from "express";

export const adaptRoute = (controller: any) => {
  return async (req: Request, res: Response) => {
    const { body } = req;
    const httpRequest: any = {
      body,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      console.log(httpResponse);
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  };
};
