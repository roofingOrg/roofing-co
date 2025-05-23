// src/components/blocks/GeneralList.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import ReactMarkdown from "react-markdown";

/**
 * GeneralList
 *
 * config: {
 *   title: string, // alternative to sectionTitle
 *   sectionTitle: string,
 *   items: [
 *     // Can be structured items
 *     {
 *       id: number,
 *       name: string,
 *       description: string,
 *       advantages: string[],
 *       colorPossibilities?: string,
 *       installationTime?: string,
 *       pictures: string[]
 *     },
 *     // Or can be simple strings
 *     "Item 1",
 *     "Item 2",
 *     ...
 *   ],
 *   listStyle?: "bullet" | "numbered" | "none"
 * }
 */
const GeneralList = ({ config = {}, readOnly = false, onConfigChange }) => {
  const {
    sectionTitle = "Select a Siding Type",
    title,
    items = [],
    listStyle = "none",
  } = config;

  // Use title as a fallback if sectionTitle is not provided
  const displayTitle = sectionTitle || title || "Service List";

  // For readOnly mode, we track which item is selected
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Helper function to get display URL
  const getDisplayUrl = (value) => {
    if (!value) return null;
    if (typeof value === "string") return value;
    if (typeof value === "object" && value.url) return value.url;
    return null;
  };

  // Check if the items are strings or objects
  const hasStructuredItems = items.length > 0 && typeof items[0] === "object";

  // ---------- READONLY MODE -----------
  if (readOnly) {
    // For simple string items list
    if (!hasStructuredItems) {
      return (
        <section className="my-6 container mx-auto px-4 md:px-16">
          <h2 className="text-2xl md:text-3xl font-semibold mb-0 text-center">
            {displayTitle}
          </h2>

          <div className="bg-white rounded-lg shadow-lg p-6">
            {listStyle === "numbered" ? (
              <ol className="list-decimal pl-5 space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="text-gray-700 text-lg">
                    <div className="markdown-content">
                      {typeof ReactMarkdown !== "undefined" ? (
                        <ReactMarkdown>{item}</ReactMarkdown>
                      ) : (
                        <p>{item}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ) : listStyle === "bullet" ? (
              <ul className="list-disc pl-5 space-y-2">
                {items.map((item, index) => (
                  <li key={index} className="text-gray-700 text-lg">
                    <div className="markdown-content">
                      {typeof ReactMarkdown !== "undefined" ? (
                        <ReactMarkdown>{item}</ReactMarkdown>
                      ) : (
                        <p>{item}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={index} className="text-gray-700">
                    <div className="markdown-content">
                      {typeof ReactMarkdown !== "undefined" ? (
                        <ReactMarkdown>{item}</ReactMarkdown>
                      ) : (
                        <p>{item}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }

    // Original structured items display
    const activeItem = items[selectedIndex] || {};

    return (
      <section className="my-2 md:my-4 px-4 md:px-16">
        {/* "Siding selection" buttons */}
        <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-2 mt-3">
          {displayTitle}
        </h2>
        <div className="flex flex-wrap justify-center mt-2 gap-2 mb-2 ">
          {items.map((item, index) => (
            <button
              key={item.id || index}
              onClick={() => setSelectedIndex(index)}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-sm sm:text-base 
                rounded-full font-semibold shadow-lg transition-all duration-300 ${
                  selectedIndex === index
                    ? "bg-second-accent text-white font-semibold shadow-xl"
                    : "bg-accent text-black"
                }`}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 15px 3px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)";
              }}
            >
              {item.name || `Option ${index + 1}`}
            </button>
          ))}
        </div>


        {/* Display selected item */}
        <motion.div
          key={activeItem.id || selectedIndex}
          className="flex flex-col items-start bg-white rounded-2xl shadow-lg p-4 sm:p-6 transition-all duration-500 mx-4 md:mx-16 md:mt-4 @container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full">
            {/* Name & Description */}
            {activeItem.name && (
              <h3 className="md:ml-10 text-xl sm:text-2xl md:text-[4vh] font-bold mb-2 md:mb-4 text-gray-800 md:text-left ml-0 text-center">
                {activeItem.name}
              </h3>
            )}
            {activeItem.description && (
              <p 
                className="text-gray-700 text-sm sm:text-base md:text-lg" 
                //style={{ textIndent: '2rem' }}
              >
                {activeItem.description}
              </p>
            )}


            {/* Advantages */}
            {activeItem.advantages && activeItem.advantages.length > 0 && (
              <div className="mt-3 md:mt-6">
                <h4 className="text-lg sm:text-xl md:text-2xl text-left md:text-center font-bold mb-2 text-gray-800">
                  Advantages
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 md:gap-y-2 pl-0">
                  {activeItem.advantages.map((adv, i) => (
                    <li
                      key={i}
                      className="flex items-start text-base md:text-lg text-gray-700"
                    >
                      <FaCheckCircle className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pictures */}
            {activeItem.pictures && activeItem.pictures.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeItem.pictures.map((pic, picIdx) => (
                  <div key={picIdx} className="aspect-video overflow-hidden rounded-lg shadow-md">
                    <img
                      src={typeof pic === "string" ? pic : pic.url}
                      alt={`${activeItem.name} - Image ${picIdx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
            
            {/* Additional Info - moved below the pictures */}
            {(activeItem.colorPossibilities || activeItem.installationTime) && (
              <div className="mt-4 md:mt-6">
                {activeItem.colorPossibilities && (
                  <p className="text-gray-700 mb-2 text-sm sm:text-base md:text-lg">
                    <strong className="text-sm sm:text-base md:text-lg">
                      Color Possibilities:{" "}
                    </strong>
                    {activeItem.colorPossibilities}
                  </p>
                )}
                {activeItem.installationTime && (
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg">
                    <strong className="text-sm sm:text-base md:text-lg">
                      Installation Time:{" "}
                    </strong>
                    {activeItem.installationTime}
                  </p>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </section>
    );
  }

  // ---------- EDIT MODE -----------
  const handleFieldChange = (field, value) => {
    onConfigChange?.({
      ...config,
      [field]: value,
    });
  };

  // For the edit mode, if we have string items, convert to simple editor
  if (!hasStructuredItems) {
    return (
      <div className="p-2 bg-gray-700 rounded text-white">
        <h3 className="font-bold mb-2">Simple List Editor</h3>

        {/* Title */}
        <label className="block text-sm mb-2">
          List Title:
          <input
            type="text"
            value={displayTitle}
            onChange={(e) => handleFieldChange("sectionTitle", e.target.value)}
            className="mt-1 w-full px-2 py-1 bg-gray-600 text-white rounded border border-gray-500"
          />
        </label>

        {/* List Style */}
        <label className="block text-sm mb-2">
          List Style:
          <select
            value={listStyle}
            onChange={(e) => handleFieldChange("listStyle", e.target.value)}
            className="mt-1 w-full px-2 py-1 bg-gray-600 text-white rounded border border-gray-500"
          >
            <option value="none">None</option>
            <option value="bullet">Bullet Points</option>
            <option value="numbered">Numbered List</option>
          </select>
        </label>

        {/* Items */}
        <div className="mt-2">
          <h4 className="font-semibold mb-1">List Items:</h4>
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start">
                <textarea
                  rows={2}
                  value={item}
                  onChange={(e) => {
                    const newItems = [...items];
                    newItems[idx] = e.target.value;
                    handleFieldChange("items", newItems);
                  }}
                  className="flex-grow px-2 py-1 bg-gray-600 text-white rounded border border-gray-500"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newItems = [...items];
                    newItems.splice(idx, 1);
                    handleFieldChange("items", newItems);
                  }}
                  className="ml-2 bg-red-600 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              handleFieldChange("items", [...items, "New item"]);
            }}
            className="mt-2 bg-blue-600 text-white px-2 py-1 rounded text-sm"
          >
            + Add Item
          </button>
        </div>
      </div>
    );
  }

  // Standard structured items editor - original code below
  // Updaters for items array
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "",
      description: "",
      advantages: [],
      colorPossibilities: "",
      installationTime: "",
      pictures: [],
    };
    handleFieldChange("items", [...items, newItem]);
  };

  const removeItem = (id) => {
    handleFieldChange(
      "items",
      items.filter((i) => i.id !== id)
    );
  };

  const updateItemField = (id, field, newVal) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, [field]: newVal } : i
    );
    handleFieldChange("items", updated);
  };

  const addAdvantage = (id) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, advantages: [...i.advantages, ""] } : i
    );
    handleFieldChange("items", updated);
  };

  const updateAdvantage = (id, idx, newVal) => {
    const updated = items.map((i) => {
      if (i.id === id) {
        const advantages = [...i.advantages];
        advantages[idx] = newVal;
        return { ...i, advantages };
      }
      return i;
    });
    handleFieldChange("items", updated);
  };

  const removeAdvantage = (id, idx) => {
    const updated = items.map((i) => {
      if (i.id === id) {
        const advantages = [...i.advantages];
        advantages.splice(idx, 1);
        return { ...i, advantages };
      }
      return i;
    });
    handleFieldChange("items", updated);
  };

  const addPicture = (id) => {
    const updated = items.map((i) =>
      i.id === id ? { ...i, pictures: [...i.pictures, ""] } : i
    );
    handleFieldChange("items", updated);
  };

  const updatePicture = (id, idx, newVal) => {
    const updated = items.map((i) => {
      if (i.id === id) {
        const pictures = [...i.pictures];
        pictures[idx] = newVal;
        return { ...i, pictures };
      }
      return i;
    });
    handleFieldChange("items", updated);
  };

  const removePicture = (id, idx) => {
    const updated = items.map((i) => {
      if (i.id === id) {
        const pictures = [...i.pictures];
        pictures.splice(idx, 1);
        return { ...i, pictures };
      }
      return i;
    });
    handleFieldChange("items", updated);
  };

  const handleImageUpload = (itemIndex, picIndex, file) => {
    if (!file) return;

    // Create a URL for display
    const fileURL = URL.createObjectURL(file);

    // Update the picture item
    const targetItem = items.find((_, i) => i === itemIndex);
    if (targetItem) {
      updatePicture(targetItem.id, picIndex, fileURL);
    }
  };

  // Original editor code
  return (
    <div className="p-2 bg-gray-700 rounded text-white overflow-auto max-h-[80vh]">
      <h3 className="font-bold mb-2">Siding Options Editor</h3>

      {/* Section Title */}
      <label className="block text-sm mb-2">
        Section Title:
        <input
          type="text"
          value={displayTitle}
          onChange={(e) => handleFieldChange("sectionTitle", e.target.value)}
          className="mt-1 w-full px-2 py-1 bg-gray-600 text-white rounded border border-gray-500"
        />
      </label>

      {/* Items */}
      <div className="mt-4">
        <h4 className="font-semibold text-sm mb-2">Options</h4>
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-600 p-3 rounded mb-3"
          >
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-semibold">{item.name || "Unnamed Option"}</h5>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>

            {/* Name */}
            <label className="block text-sm mb-2">
              Name:
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) =>
                  updateItemField(item.id, "name", e.target.value)
                }
                className="mt-1 w-full px-2 py-1 bg-gray-600 text-white rounded border border-gray-500"
              />
            </label>

            {/* Description */}
            <label className="block text-sm mb-2">
              Description:
              <textarea
                rows="2"
                value={item.description || ""}
                onChange={(e) =>
                  updateItemField(item.id, "description", e.target.value)
                }
                className="mt-1 w-full px-2 py-1 bg-gray-600 text-white rounded border border-gray-500"
              />
            </label>

            {/* Advantages */}
            <div className="mt-2">
              <label className="block text-sm mb-1">Advantages:</label>
              <div className="ml-3">
                {item.advantages?.map((adv, idx) => (
                  <div key={idx} className="flex items-center mb-1">
                    <input
                      type="text"
                      value={adv}
                      onChange={(e) =>
                        updateAdvantage(item.id, idx, e.target.value)
                      }
                      className="flex-grow px-2 py-1 bg-gray-600 text-white text-sm rounded border border-gray-500"
                    />
                    <button
                      onClick={() => removeAdvantage(item.id, idx)}
                      className="ml-2 text-red-400 hover:text-red-300"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addAdvantage(item.id)}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Add Advantage
                </button>
              </div>
            </div>

            {/* Color Possibilities */}
            <label className="block text-sm mt-2 mb-1">
              Color Possibilities:
              <input
                type="text"
                value={item.colorPossibilities || ""}
                onChange={(e) =>
                  updateItemField(item.id, "colorPossibilities", e.target.value)
                }
                className="mt-1 w-full px-2 py-1 bg-gray-600 text-white text-sm rounded border border-gray-500"
              />
            </label>

            {/* Installation Time */}
            <label className="block text-sm mt-2 mb-1">
              Installation Time:
              <input
                type="text"
                value={item.installationTime || ""}
                onChange={(e) =>
                  updateItemField(item.id, "installationTime", e.target.value)
                }
                className="mt-1 w-full px-2 py-1 bg-gray-600 text-white text-sm rounded border border-gray-500"
              />
            </label>

            {/* Pictures */}
            <div className="mt-2">
              <label className="block text-sm mb-1">Pictures:</label>
              <div className="ml-3">
                {item.pictures?.map((pic, idx) => (
                  <div key={idx} className="flex items-center mb-1">
                    <div className="flex-grow flex items-center">
                      <input
                        type="text"
                        value={pic}
                        onChange={(e) =>
                          updatePicture(item.id, idx, e.target.value)
                        }
                        className="flex-grow px-2 py-1 bg-gray-600 text-white text-sm rounded-l border border-gray-500"
                      />
                      <label className="bg-gray-500 px-2 py-1 cursor-pointer text-xs border-t border-r border-b border-gray-500 rounded-r">
                        Browse
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleImageUpload(
                                items.findIndex((i) => i.id === item.id),
                                idx,
                                file
                              );
                            }
                          }}
                        />
                      </label>
                    </div>
                    <button
                      onClick={() => removePicture(item.id, idx)}
                      className="ml-2 text-red-400 hover:text-red-300"
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addPicture(item.id)}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Add Picture
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addItem}
          className="mt-2 bg-blue-600 text-white px-3 py-1 rounded font-medium"
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default GeneralList;
