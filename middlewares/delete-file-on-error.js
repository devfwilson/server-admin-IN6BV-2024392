import { cloudinary } from "./file-uploader.js";

export const cleanUploaderFileOnFinish = (req, res, next) => {
    if (req.file) {
        res.on('finish', async () => {
            res.on('finish', async () => {
                try {
                    if (res.statusCode >= 400) {
                        const publicId = req.file.public_id || req.file.filename;
                        if (publicId) {
                            await cloudinary.uploader.destroy(publicId);
                            console.log(`Archivo eliminado en Cloudinary: ${res.statusCode}: ${publicId}`

                            );
                        }
                    }
                } catch (error) {
                    console.error(`Error al eliminar archivo en Cloudinary: ${error.message}`);
                }
            })
        })
    }
    next();
}

export const deleteFileOnError = async (err, req, res, next) => {
    try {
        if (req.file) {
            const publicId = req.file.publicId || req.file.filename;
            if (publicId) {
                await cloudinary.uploader.destroy(publicId);
                console.log(
                    `Archivo eliminado en Cloudinary (error handle): ${publicId}`
                )
            }
        }
    } catch (unlickErr) {
        console.error(
            `Error al eliminar archivo de Clodinary (error handle): ${unlickErr.message}`
        )
    }
}