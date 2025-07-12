import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

function CommonCard({
  title,
  description,
  extraTextStyles,
  footerContent,
  content,
  headerRightContent,
}) {
  return (
    <Card
      className={
        "flex flex-col gap-3 bg-gray-100 rounded-2xl p-4 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer"
      }
    >
      <CardHeader className={"p-0"}>
        <div className="flex justify-between">
          {title ? (
            <CardTitle
              className={`text-2xl max-w-250px text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950 ${extraTextStyles}`}
            >
              {title}
            </CardTitle>
          ) : null}
          <div className="">
            {headerRightContent ? headerRightContent : null}
          </div>
        </div>
        <div>
          {description ? (
            <CardDescription className={"mt-3 text-gray-700"}>
              {description}
            </CardDescription>
          ) : null}
        </div>
      </CardHeader>
      {content ? <CardContent className={"p-0"}>{content}</CardContent> : null}
      {footerContent ? (
        <CardFooter className={"p-0"}>{footerContent}</CardFooter>
      ) : null}
    </Card>
  );
}

export default CommonCard;
