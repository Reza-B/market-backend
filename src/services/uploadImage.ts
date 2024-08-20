import multer from "multer";
import path from "path";

// تنظیم مکان و نام فایل‌های آپلود شده
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/products/");
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// فیلتر کردن فایل‌ها بر اساس نوع (فقط تصاویر)
const fileFilter = (req: any, file: any, cb: any) => {
	if (file.mimetype.startsWith("image/")) {
		cb(null, true);
	} else {
		cb(new Error("Only images are allowed!"), false);
	}
};

export const uploadImage = ({ dest }: { dest: string }) => {
	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, `uploads/${dest}/`);
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + path.extname(file.originalname));
		},
	});
	const upload = multer({ storage, fileFilter });
	return upload;
};
