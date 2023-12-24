import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../../store";
import { reader } from "../../config/helpers.ts";
import {
  CustomButton,
  Tab,
  FilePicker,
  AIPicker,
  ColorPicker,
} from "../../components";
import { EditorTabs, FilterTabs, DecalTypes } from "../../config/constants.ts";
import { fadeAnimation, slideAnimation } from "../../config/motion";
import { useState } from "react";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState<any>(null);
  const [prompt, setPrompt] = useState<any>(null);
  const [generatingImg, setGeneratingImg] = useState<any>(null);

  const [activeEditorTab, setActiveEditorTab] = useState<any>("");
  const [activeFilterTab, setActiveFilterTab] = useState<any>({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <></>;
    }
  };

  const handleSubmit = async () => {
    if (!prompt) return;

    try {
      alert(
        "Sorry, this feature doesn't work, because DALL.E costs a ton of money to run publicly :(",
      );
    } catch (e) {
      alert(e);
    } finally {
      setActiveEditorTab("");
      setGeneratingImg(null);
    }
  };

  const handleDecals = (type: any, res: any) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = res;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName: string) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prev: any) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));
  };
  const readFile = async (type: any) => {
    reader(file).then((res: any) => {
      handleDecals(type, res);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => {
                      setActiveEditorTab(tab.name);
                    }}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="absolute z-10 top-5 right-5"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => {
                state.intro = true;
              }}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                tab={tab}
                handleClick={() => {
                  handleActiveFilterTab(tab.name);
                }}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
