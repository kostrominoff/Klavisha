import { IOption } from "@/components/ui/dropdown/option.interface";
import { useEffect, useRef, useState } from "react";

type Props<DataType, OptionValue> = {
  initialData: DataType[];
  makeOptionsFn: (elements: DataType[]) => IOption<OptionValue>[];
  filterFn: (filter: string) => Promise<DataType[]>;
};

export const useAsyncOptions = <T, V>({
  initialData,
  makeOptionsFn,
  filterFn,
}: Props<T, V>) => {
  const [filter, setFilter] = useState("");
  const [options, setOptions] = useState<IOption<V>[]>(
    initialData ? makeOptionsFn(initialData) : []
  );

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelRequest = useRef(false);

  useEffect(() => {
    cancelRequest.current = false;
    timer.current && clearTimeout(timer.current);

    if (!filter)
      return setOptions(initialData ? makeOptionsFn(initialData) : []);

    const updateOptions = async () => {
      try {
        const data = await filterFn(filter);
        setOptions(makeOptionsFn(data));
      } catch {
        if (cancelRequest.current) return;
        return setOptions(initialData ? makeOptionsFn(initialData) : []);
      }
    };

    if (cancelRequest.current) return;

    timer.current = setTimeout(updateOptions, 500);

    return () => {
      cancelRequest.current = true;
      timer.current && clearTimeout(timer.current);
    };
  }, [filter, filterFn, initialData, makeOptionsFn]);

  return { options, filter, setFilter };
};
