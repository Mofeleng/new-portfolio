import { WindowControls } from "@components"
import WindowWrapper from "@hoc/window-wrapper";
import useWindowStore from "@store/window";

interface Data {
  name: string;
  imageUrl?: string;
}
const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile.data;

  if (!data) return null;

  const { name, imageUrl} = data as Data;
  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{ name }</h2>
      </div>
      <div className="p-5 bg-white">
        { imageUrl ? (
          <div className="w-full">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-auto max-h-[70vh] object-contain rounded"
            />
          </div>
        ) : null}
      </div>
    </>
  )
}

export const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow