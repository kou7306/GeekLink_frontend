"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { technologies } from "../profile/options";
import { getUuidFromCookie } from "@/actions/users";

const eventSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  event_type: z.enum(["EVENT", "HACKATHON"]),
  purpose: z.string().min(1, "目的は必須です"),
  max_participants: z.number().min(1, "参加者数は1以上である必要があります"),
  requirements: z.string().min(1, "要件は必須です"),
  deadline: z.string().min(1, "締切日は必須です"),
  techs: z.array(z.string()).min(1, "少なくとも1つの技術を選択してください"),
});

type EventFormData = z.infer<typeof eventSchema>;

const CreateEventForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit: SubmitHandler<EventFormData> = async (data) => {
    try {
      const owner_id = await getUuidFromCookie();
      if (!owner_id) {
        toast.error("ユーザーIDの取得に失敗しました");
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            owner_id,
            deadline: new Date(data.deadline).toISOString(),
          }),
        }
      );

      if (response.ok) {
        toast.success("イベントが作成されました");
        router.push("/team-recruitments");
      } else {
        const errorData = await response.json();
        toast.error(
          `イベントの作成に失敗しました: ${errorData.error || "不明なエラー"}`
        );
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("エラーが発生しました");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-sub_base shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-100 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          新しいイベントを作成
        </h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-text"
          >
            タイトル
          </label>
          <input
            {...register("title")}
            type="text"
            id="title"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-content_base"
          />
          {errors.title && (
            <p className="mt-1 text-red-600 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="event_type"
            className="block text-sm font-medium text-text"
          >
            イベントタイプ
          </label>
          <select
            {...register("event_type")}
            id="event_type"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-content_base"
          >
            <option value="EVENT">イベント</option>
            <option value="HACKATHON">ハッカソン</option>
          </select>
          {errors.event_type && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.event_type.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="purpose"
            className="block text-sm font-medium text-text"
          >
            目的
          </label>
          <textarea
            {...register("purpose")}
            id="purpose"
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-content_base"
          ></textarea>
          {errors.purpose && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.purpose.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="max_participants"
            className="block text-sm font-medium text-text"
          >
            最大参加者数
          </label>
          <input
            {...register("max_participants", { valueAsNumber: true })}
            type="number"
            id="max_participants"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-content_base"
          />
          {errors.max_participants && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.max_participants.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="requirements"
            className="block text-sm font-medium text-text"
          >
            要件
          </label>
          <textarea
            {...register("requirements")}
            id="requirements"
            rows={3}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-content_base"
          ></textarea>
          {errors.requirements && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.requirements.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="deadline"
            className="block text-sm font-medium text-text"
          >
            締切日
          </label>
          <DatePicker
            selected={watch("deadline") ? new Date(watch("deadline")) : null}
            onChange={(date) => setValue("deadline", date?.toISOString() ?? "")}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-content_base"
            dateFormat="yyyy/MM/dd"
          />
          {errors.deadline && (
            <p className="mt-1 text-red-600 text-sm">
              {errors.deadline.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-text">
            使用技術
          </label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {technologies.map((tech) => (
              <label key={tech} className="inline-flex items-center">
                <input
                  {...register("techs")}
                  type="checkbox"
                  value={tech}
                  className="form-checkbox h-5 w-5 text-content_base bg-content_base"
                />
                <span className="ml-2 text-text">{tech}</span>
              </label>
            ))}
          </div>
          {errors.techs && (
            <p className="mt-1 text-red-600 text-sm">{errors.techs.message}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/team-recruitments")}
            className="w-full flex justify-center py-2 px-4 border border-indigo-600 rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mx-2"
          >
            イベントを作成
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
