const Banner = () => (
  <div>
    <div
      className="relative md:pt-3 md:pb-3 uppercase bg-[#231c0d] tracking-wider	"
      style={{ fontFamily: "Libre Franklin" }}
    >
      <div className="">
        <div className=" md:text-[20px] text-sm text-center px-16">
          <p className="font-bold  text-[#f2e2d3] pr-[150px]">
            <center>
              <marquee
                direction="left"
                className="md:w-[100%] w-[250%] hidden sm:block"
              >
                Public sale is live at 0.07 ETH
              </marquee>
            </center>
            {/* <div className="w-[200px]">Public sale is live!</div> */}
          </p>
        </div>
      </div>
    </div>
    <div
      className="md:hidden uppercase bg-[#231c0d] tracking-wider"
      style={{ fontFamily: "Libre Franklin" }}
    >
      <div className="text-sm text-center pt-1 pb-1">
        <p className="font-bold  text-[#f2e2d3]">
          <div>Public sale is live at 0.07 ETH</div>
          {/* <div className="w-[200px]">Public sale is live!</div> */}
        </p>
      </div>
    </div>
  </div>
);

export default Banner;
