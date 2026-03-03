import { useState, useEffect } from "react";
import Dropdown from "../dropdown/dropdown";
import useDebounce from "~/hooks/useDebounce";

interface TeachersFilterProps {
  onFiltersChange: (filters: {
    language: string;
    level: string;
    price: string;
  }) => void;
}

const languages = ['English', 'Spanish','French','German','Mandarin Chinese','Italian','Korean','Vietnamese'];

const levels = ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced', 'C2 Proficient'];

const prices = ['25','27','28','30','32','35']



const TeachersFilter = ({onFiltersChange}: TeachersFilterProps) => {
 const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [price, setPrice] = useState('');

 const debouncedFilter = useDebounce(onFiltersChange, 150);

useEffect(() => {
    debouncedFilter({
      language: language === "" ? "" : language,
      level: level === "" ? "" : level,
      price: price === "" ? "" : price,
    });
  }, [language, level, price, debouncedFilter]);

  const resetAll = () => {
    setLanguage("");
    setLevel("");
    setPrice("");
  };




return (
  <form className="flex gap-5 px-16">
      <Dropdown label='Languages' value={language} options={languages} placeholder="" onChange={setLanguage} width={55.25} />
      <Dropdown label='Level of knowledge' value={level} options={levels} placeholder="" onChange={setLevel} width={49.5} />
      <Dropdown label='Price' value={`${price} $`} options={prices} placeholder="" onChange={setPrice} width={31} />
  </form>
)

}

export default TeachersFilter;