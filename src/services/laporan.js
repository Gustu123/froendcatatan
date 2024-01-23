import RNFetchBlob from "rn-fetch-blob";
import {baseUrl} from "./baseApi";
import {default as AsyncStroge} from "@react-native-async-storage/async-storage";

export const downloadPdf = (isCashOut = '1') => {
    const url = `${baseUrl}api/transaction/pdf/${isCashOut}`

}

export const downloadExcel = async (isCashOut = '1') => {
    const url = `${baseUrl}api/transaction/excel/${isCashOut}`
    const token = await AsyncStroge.getItem("token")
    const {fs} = RNFetchBlob
    const downloadDir = fs.dirs.DownloadDir
    const filename = "laporan"
    const config = {
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: downloadDir + `/${filename}_report.xlsx`,
            description: 'Downloading Excel'
        },
    }

    RNFetchBlob
        .config(config)
        .fetch(
            "GET",
            url,
            {
                Authorization: `Bearer ${token}`
            }
        )
        .then(res => {
            console.log('Download excel : ', JSON.stringify(res, null, 2))
        })
        .catch(err => {
            console.log('Error download excel : ', JSON.stringify(err, null, 2))
        })
}
