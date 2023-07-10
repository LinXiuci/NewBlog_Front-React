import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getImageResources } from "../../../api/app-album-api";

interface DetailedResultType {
  key: string;
  title: string;
  url: string;
  image: {
    key: string;
    src: string;
  }[];
}
/**
 * @description 图片详细页
 *  */
function DetailedPage() {
  const [params] = useSearchParams();
  const [data, setData] = useState<DetailedResultType[]>([]);

  const fetchResults = async () => {
    const key: string | null = params.get("key");
    if (key !== null) {
      const { results } = await getImageResources<DetailedResultType>(key);
      console.log(results);
      setData(results);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <main>
      <h1>图片详细页</h1>
    </main>
  );
}

export default DetailedPage;
