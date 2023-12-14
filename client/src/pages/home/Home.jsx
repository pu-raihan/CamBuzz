import Stories from "../../components/stories/Stories";
import Share from "../../components/share/Share";
import Posts from "../../components/posts/Posts";
// import "./home.scss";

const Home = () => {
  return (
    <div className="p-3 xs:p-4 sm:py-5 sm:px-[70px] min-h-full bg-bgSoft dark:bg-dbgSoft">
      <Stories/>
      <Share/>
      <Posts/>
    </div>
  );
};

export default Home;
