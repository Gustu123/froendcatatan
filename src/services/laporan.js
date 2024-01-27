import RNFetchBlob from "rn-fetch-blob";
import {baseUrl} from "./baseApi";
import {default as AsyncStroge} from "@react-native-async-storage/async-storage";

export const downloadPdf = async (isCashOut = '1') => {
    const url = `${baseUrl}api/transaction/pdf/${isCashOut}`
    const token = await AsyncStroge.getItem("token")
    const {fs} = RNFetchBlob
    const downloadDir = fs.dirs.DownloadDir
    const filename = "laporan"
    const config = {
        fileCache: true,
        addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: downloadDir + `/${filename}_report.pdf`,
            description: 'Downloading Pdf'
        },
    }
    console.log(url)
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
            console.log('Download Pdf : ', JSON.stringify(res, null, 2))
        })
        .catch(err => {
            console.log('Error download Pdf : ', JSON.stringify(err, null, 2))
        })

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
    console.log(url)
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
