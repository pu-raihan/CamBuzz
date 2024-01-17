import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";
 

const Home = () => {
  return (
    <div className="p-3 xs:p-4 sm:py-5 sm:px-8 xl:px-[70px] min-h-[calc(100vh-192px)] sm:min-h-[calc(100vh-112px)] bg-bgSoft dark:bg-dbgSoft no-scrollbar">
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  );
};

export default Home;
