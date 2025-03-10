import SummarryApi from "../common/SummaryApi"
import Axios from "../utils/Axios"

const uploadImg = async (image) => {
    try {
        const formData = new FormData();
        formData.append('image', image)

        const res = await Axios({
            ...SummarryApi.uploadImg,
            data: formData
        })

        return res
    } catch (error) {
        console.log(error)
    }
}

export default uploadImg