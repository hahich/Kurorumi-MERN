import nothingImg from "../assets/nothingImg/nothing-here-flat-illustration_418302-77.avif"

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
        <img src={nothingImg} alt="no data" className="w-36" />
        <p className="text-neutral-500">No Data</p>
    </div>
  )
}

export default NoData