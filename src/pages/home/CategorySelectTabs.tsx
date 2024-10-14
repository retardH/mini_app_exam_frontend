import { ScrollArea } from "@/components/ui/ScrollArea";

const categories = ["all", "veggies", "fruits", "meats", "drinks"];

const CategorySelectTabs = () => {
  return (
    <ScrollArea type="scroll" className="w-[364px] whitespace-nowrap">
      <div className="flex w-max gap-2">
        {categories.map((c) => {
          return (
            <div
              key={c}
              className="py-1 text-center min-w-[60px] px-4 border border-green-500 rounded-full"
            >
              {c}
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default CategorySelectTabs;
