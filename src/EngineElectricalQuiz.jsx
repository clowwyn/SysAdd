import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, AlertCircle, Home, Square, CheckSquare } from 'lucide-react';

const EngineElectricalQuiz = ({ onBackToHome }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // For multi-select
  const [showExplanation, setShowExplanation] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [isRetakeWrong, setIsRetakeWrong] = useState(false);

  const questions = [
    // IDENTIFICATION - Engine Electrical System (Single Choice)
    {
      id: 1,
      type: 'single',
      question: "It is an electrochemical device that converts chemical energy into electrical energy.",
      options: ["Battery", "Alternator", "Generator", "Capacitor"],
      correct: 0,
      explanation: "A battery converts chemical energy into electrical energy through electrochemical reactions."
    },
    {
      id: 2,
      type: 'single',
      question: "This type of battery uses chemical reaction and totally drains after a period of time.",
      options: ["Secondary cell", "Primary cell", "Rechargeable battery", "Lithium battery"],
      correct: 1,
      explanation: "Primary cells are non-rechargeable batteries that drain completely after use."
    },
    {
      id: 3,
      type: 'single',
      question: "What is the chemical name of lead dioxide?",
      options: ["H2SO4", "PbO2", "Pb", "PbSO4"],
      correct: 1,
      explanation: "PbO2 is the chemical formula for lead dioxide, used in lead-acid batteries."
    },
    {
      id: 4,
      type: 'single',
      question: "What is the chemical name of sulfuric acid?",
      options: ["H2O", "H2SO4", "HCl", "NaOH"],
      correct: 1,
      explanation: "H2SO4 is the chemical formula for sulfuric acid, the electrolyte in lead-acid batteries."
    },
    {
      id: 5,
      type: 'single',
      question: "It is the releasing of hydrogen and oxygen from the battery during charging that results in water usage.",
      options: ["Evaporation", "Gassing", "Condensation", "Oxidation"],
      correct: 1,
      explanation: "Gassing occurs during charging when hydrogen and oxygen are released, causing water loss."
    },
    {
      id: 6,
      type: 'single',
      question: "Type of starter motor that has a drive lever connected to a switch plunger that pushes the pinion gear and causes it to engage with the ring gear.",
      options: ["Reduction type", "Conventional type", "Planetary type", "Direct drive"],
      correct: 1,
      explanation: "Conventional type starter motors use a drive lever connected to a switch plunger."
    },
    {
      id: 7,
      type: 'single',
      question: "It is a type of starter motor that increases torque by reducing the speed of the armature with the reduction gear.",
      options: ["Conventional type", "Planetary type", "Reduction type", "Series wound"],
      correct: 2,
      explanation: "Reduction type starter motors use reduction gears to increase torque while reducing speed."
    },
    {
      id: 8,
      type: 'single',
      question: "It is a type of starter motor that uses a planetary gear to increase torque by reducing the rotational speed of the armature.",
      options: ["Conventional type", "Reduction type", "Planetary type", "Compound type"],
      correct: 2,
      explanation: "Planetary type starter motors use planetary gear systems for torque multiplication."
    },
    {
      id: 9,
      type: 'single',
      question: "What is the minimum cranking speed required for gasoline engines?",
      options: ["20 to 40 rpm", "40 to 60 rpm", "60 to 80 rpm", "80 to 100 rpm"],
      correct: 1,
      explanation: "Gasoline engines require a minimum cranking speed of 40 to 60 rpm to start."
    },
    {
      id: 10,
      type: 'single',
      question: "What is the minimum cranking speed required for diesel engines?",
      options: ["40 to 60 rpm", "60 to 80 rpm", "80 to 100 rpm", "100 to 120 rpm"],
      correct: 2,
      explanation: "Diesel engines require a higher minimum cranking speed of 80 to 100 rpm due to compression ignition."
    },
    {
      id: 11,
      type: 'single',
      question: "It is a device that measures little amount of current.",
      options: ["Voltmeter", "Galvanometer", "Ammeter", "Ohmmeter"],
      correct: 1,
      explanation: "A galvanometer is a sensitive instrument used to detect and measure small electric currents."
    },
    {
      id: 12,
      type: 'single',
      question: "It is a device to regulate the generated voltage in the charging system even when the alternator speed changes.",
      options: ["Rectifier", "IC Regulator", "Diode", "Capacitor"],
      correct: 1,
      explanation: "The IC (Integrated Circuit) Regulator maintains constant voltage output despite alternator speed variations."
    },
    {
      id: 13,
      type: 'single',
      question: "It converts mechanical energy into electrical energy.",
      options: ["Battery", "Starter", "Alternator", "Ignition coil"],
      correct: 2,
      explanation: "An alternator converts mechanical energy from the engine into electrical energy to charge the battery."
    },
    {
      id: 14,
      type: 'single',
      question: "It is used to rectify the alternating current in direct current.",
      options: ["Capacitor", "Resistor", "Rectifier", "Transformer"],
      correct: 2,
      explanation: "A rectifier converts alternating current (AC) to direct current (DC) in the charging system."
    },
    {
      id: 15,
      type: 'single',
      question: "Part of an alternator that consists of an iron core with two claw shaped finger pole pieces.",
      options: ["Stator", "Rotor", "Rectifier", "Regulator"],
      correct: 1,
      explanation: "The rotor has claw-shaped pole pieces that create the rotating magnetic field in an alternator."
    },
    {
      id: 16,
      type: 'single',
      question: "It distributes ignition voltage to the spark plugs.",
      options: ["Ignition coil", "Distributor", "Spark plug", "Battery"],
      correct: 1,
      explanation: "The distributor routes high voltage from the ignition coil to each spark plug in firing order."
    },
    {
      id: 17,
      type: 'single',
      question: "It distributes the high-tension current generated by the ignition coil to each cylinder according to the firing order.",
      options: ["Spark plug", "High tension cords", "Distributor", "Rotor"],
      correct: 2,
      explanation: "The distributor ensures proper timing and distribution of high voltage to cylinders in the correct firing sequence."
    },
    {
      id: 18,
      type: 'single',
      question: "Discharge the high voltage applied to the electrodes to ignite the air-fuel mixture in the combustion chamber.",
      options: ["Ignition coil", "Distributor", "Spark plug", "Battery"],
      correct: 2,
      explanation: "Spark plugs create the spark that ignites the air-fuel mixture in the combustion chamber."
    },
    {
      id: 19,
      type: 'single',
      question: "Converts the battery voltage to the high voltage needed to fire the spark plugs according to the ignition timing.",
      options: ["Alternator", "Distributor", "Spark plug", "Ignition coil"],
      correct: 3,
      explanation: "The ignition coil steps up battery voltage (12V) to high voltage (thousands of volts) needed for spark plugs."
    },
    {
      id: 20,
      type: 'single',
      question: "It advances the ignition timing according to the engine speed.",
      options: ["Vacuum advancer", "Centrifugal governor advancer", "Electronic control unit", "Distributor cap"],
      correct: 1,
      explanation: "The centrifugal governor advancer adjusts ignition timing based on engine RPM."
    },
    // ENUMERATION QUESTIONS (Multi-Select)
    {
      id: 21,
      type: 'multiple',
      question: "Give the 3 functions of Battery (Select all 3 correct answers)",
      options: [
        "Powers lights, radio, and accessories when engine is off",
        "Provides high current to starter motor during starting",
        "Stabilizes voltage and supplies extra current when engine is running",
        "Generates electricity for the vehicle",
        "Regulates alternator output",
        "Cools the engine"
      ],
      correct: [0, 1, 2],
      explanation: "The battery has three main functions: 1) Powers accessories when engine is off, 2) Provides starting power, 3) Stabilizes voltage and supplements alternator when engine is running."
    },
    {
      id: 22,
      type: 'multiple',
      question: "Give the four types of Starter motor (Select all 4 correct answers)",
      options: [
        "Conventional type",
        "Reduction type",
        "Planetary type",
        "Planetary PS type",
        "Direct drive type",
        "Magnetic type"
      ],
      correct: [0, 1, 2, 3],
      explanation: "The four types of starter motors are: Conventional type, Reduction type, Planetary type, and Planetary PS type."
    },
    {
      id: 23,
      type: 'multiple',
      question: "Give the 3 functions of Alternator (Select all 3 correct answers)",
      options: [
        "Generation - converts mechanical to electrical energy",
        "Rectification - converts AC to DC",
        "Regulation of voltage - maintains constant output",
        "Stores electrical energy",
        "Starts the engine",
        "Distributes power to spark plugs"
      ],
      correct: [0, 1, 2],
      explanation: "The alternator has three main functions: Generation (converts mechanical to electrical energy), Rectification (AC to DC conversion), and Regulation (maintains constant voltage)."
    },
    {
      id: 24,
      type: 'multiple',
      question: "Give the three essential elements of Good combustion (Select all 3 correct answers)",
      options: [
        "Good air-fuel mixture",
        "Good compression",
        "Good spark",
        "Good cooling",
        "Good lubrication",
        "Good exhaust"
      ],
      correct: [0, 1, 2],
      explanation: "The three essential elements for good combustion are: Good air-fuel mixture, Good compression, and Good spark."
    },
    {
      id: 25,
      type: 'multiple',
      question: "Give the four types of Ignition system (Select all 4 correct answers)",
      options: [
        "Breaker point type",
        "Transistorized ignition system",
        "Transistorized type with ESA",
        "Direct Ignition system",
        "Magnetic ignition system",
        "Capacitive discharge system"
      ],
      correct: [0, 1, 2, 3],
      explanation: "The four types of ignition systems are: Breaker point type, Transistorized ignition system, Transistorized type with ESA, and Direct Ignition system."
    },
    {
      id: 26,
      type: 'multiple',
      question: "Give the 3 types of spark plugs (Select all 3 correct answers)",
      options: [
        "Conventional",
        "Platinum",
        "Iridium",
        "Copper",
        "Silver",
        "Gold"
      ],
      correct: [0, 1, 2],
      explanation: "The three types of spark plugs are: Conventional (copper core), Platinum, and Iridium."
    },
    // BATTERY PARTS (Single Choice)
    {
      id: 27,
      type: 'single',
      question: "Battery parts: Terminal post",
      options: ["Connection point for battery cables", "Separates cells", "Holds electrolyte", "Covers battery"],
      correct: 0,
      explanation: "Terminal posts are the connection points where battery cables attach to provide electrical connection."
    },
    {
      id: 28,
      type: 'single',
      question: "Battery parts: Cell connectors",
      options: ["External cables", "Internal connections between battery cells", "Terminal posts", "Vent caps"],
      correct: 1,
      explanation: "Cell connectors link individual cells together internally to create the battery's total voltage."
    },
    {
      id: 29,
      type: 'single',
      question: "Battery parts: Cells",
      options: ["Battery case", "Individual 2-volt units that make up the battery", "Terminal posts", "Electrolyte"],
      correct: 1,
      explanation: "Each cell produces approximately 2 volts; six cells in series create a 12-volt battery."
    },
    {
      id: 30,
      type: 'single',
      question: "Battery parts: Plates",
      options: ["Battery cover", "Lead grids that hold active material for chemical reaction", "Separators", "Case"],
      correct: 1,
      explanation: "Plates are lead grids coated with active material where the electrochemical reactions occur."
    },
    {
      id: 45,
      type: 'single',question: "Battery parts: Electrolyte",
      options: ["Plastic case", "Sulfuric acid and water solution", "Lead plates", "Separators"],
      correct: 1,
      explanation: "Electrolyte is a mixture of sulfuric acid and water that enables the chemical reactions in the battery."
    },
    {
      id: 46,
      type: 'single',question: "Battery parts: Separators",
      options: ["Terminal posts", "Insulating material between positive and negative plates", "Cell connectors", "Vent caps"],
      correct: 1,
      explanation: "Separators prevent short circuits by keeping positive and negative plates apart while allowing electrolyte flow."
    },
    {
      id: 47,
      type: 'single',question: "Battery parts: Case",
      options: ["Plastic housing that contains all battery components", "Metal cover", "Terminal post", "Electrolyte"],
      correct: 0,
      explanation: "The case is the outer plastic housing that contains and protects all internal battery components."
    },
    {
      id: 48,
      type: 'single',question: "Battery parts: Cell partition",
      options: ["External cover", "Internal walls separating individual cells", "Terminal posts", "Plates"],
      correct: 1,
      explanation: "Cell partitions are internal walls that divide the battery into separate cell compartments."
    },
    {
      id: 49,
      type: 'single',question: "Battery parts: Cover",
      options: ["Top lid that seals the battery", "Bottom case", "Side panel", "Terminal post"],
      correct: 0,
      explanation: "The cover is the top lid that seals the battery and often contains vent caps or built-in hydrometer."
    },
    {
      id: 50,
      type: 'single',question: "Battery parts: Vent caps",
      options: ["Terminal covers", "Removable caps for checking/adding water", "Cell connectors", "Separators"],
      correct: 1,
      explanation: "Vent caps allow access for checking electrolyte levels and adding distilled water, while venting gases."
    },
    {
      id: 51,
      type: 'single',question: "Battery code '34 B 19 L': What does '34' represent?",
      options: ["Battery width", "Performance rating/capacity", "Battery length", "Terminal position"],
      correct: 1,
      explanation: "The first number (34) indicates the battery's performance rating or capacity specification."
    },
    {
      id: 52,
      type: 'single',question: "Battery code '34 B 19 L': What does 'B' represent?",
      options: ["Brand name", "Battery width and height dimensions", "Battery type", "Terminal size"],
      correct: 1,
      explanation: "The letter 'B' indicates the battery's width and height dimensions according to JIS standards."
    },
    {
      id: 53,
      type: 'single',question: "Battery code '34 B 19 L': What does '19' represent?",
      options: ["Battery age", "Battery width", "Battery length in centimeters", "Number of plates"],
      correct: 2,
      explanation: "The number '19' represents the battery's length dimension (approximately 19 cm)."
    },
    {
      id: 54,
      type: 'single',question: "Battery code '34 B 19 L': What does 'L' represent?",
      options: ["Large size", "Position of negative terminal (Left)", "Long life", "Lead type"],
      correct: 1,
      explanation: "The letter 'L' indicates the negative terminal is positioned on the left side when viewed from the front."
    },
    {
      id: 55,
      type: 'single',question: "Starter Parts: Magnetic switch",
      options: ["Engages starter drive and completes electrical circuit", "Rotates the engine", "Reduces speed", "Generates power"],
      correct: 0,
      explanation: "The magnetic switch (solenoid) engages the pinion gear and completes the high-current circuit to the motor."
    },
    {
      id: 56,
      type: 'single',question: "Starter Parts: Drive lever",
      options: ["Holds the motor", "Mechanical linkage that pushes pinion gear forward", "Rotates armature", "Connects to battery"],
      correct: 1,
      explanation: "The drive lever is the mechanical linkage that moves the pinion gear to engage with the ring gear."
    },
    {
      id: 57,
      type: 'single',question: "Starter Parts: Pinion gear",
      options: ["Large gear on flywheel", "Small gear that engages with ring gear to crank engine", "Reduction gear", "Planetary gear"],
      correct: 1,
      explanation: "The pinion gear is the small gear that meshes with the engine's ring gear to turn the crankshaft."
    },
    {
      id: 58,
      type: 'single',question: "Starter Parts: Yoke",
      options: ["Outer housing that contains field coils and provides magnetic path", "Rotating part", "Drive mechanism", "Electrical switch"],
      correct: 0,
      explanation: "The yoke is the outer cylindrical housing that holds the field coils and provides a path for magnetic flux."
    },
    {
      id: 59,
      type: 'single',question: "Starter Parts: Armature",
      options: ["Outer housing", "Rotating component with windings that converts electrical to mechanical energy", "Drive gear", "Switch"],
      correct: 1,
      explanation: "The armature is the rotating part with windings that interacts with the magnetic field to produce rotation."
    },
    {
      id: 60,
      type: 'single',question: "Alternator Parts: Rectifier",
      options: ["Converts AC to DC current", "Regulates voltage", "Rotates magnetic field", "Cools the alternator"],
      correct: 0,
      explanation: "The rectifier contains diodes that convert the alternator's AC output to DC for the vehicle's electrical system."
    },
    {
      id: 61,
      type: 'single',question: "Alternator Parts: IC regulator",
      options: ["Rectifies current", "Controls and maintains constant voltage output", "Rotates rotor", "Generates current"],
      correct: 1,
      explanation: "The IC (Integrated Circuit) regulator controls field current to maintain constant voltage output."
    },
    {
      id: 62,
      type: 'single',question: "Alternator Parts: Rotor coil",
      options: ["Stationary windings", "Rotating electromagnet that creates magnetic field", "Converts AC to DC", "Regulates voltage"],
      correct: 1,
      explanation: "The rotor coil is the rotating electromagnet that creates the magnetic field for generating electricity."
    },
    {
      id: 63,
      type: 'single',question: "Alternator Parts: Rotor",
      options: ["Stationary part", "Rotating assembly with coil and claw poles", "Rectifier assembly", "Voltage regulator"],
      correct: 1,
      explanation: "The rotor is the complete rotating assembly including the coil and claw-shaped pole pieces."
    },
    {
      id: 64,
      type: 'single',question: "Alternator Parts: Stator coil",
      options: ["Rotating windings", "Stationary windings where AC voltage is generated", "Rectifier", "Regulator"],
      correct: 1,
      explanation: "The stator coil consists of stationary windings where AC voltage is induced by the rotating magnetic field."
    },
    {
      id: 65,
      type: 'single',question: "Alternator Parts: Pulley",
      options: ["Voltage regulator", "Wheel driven by belt to rotate the alternator", "Rectifier", "Stator"],
      correct: 1,
      explanation: "The pulley is driven by the engine belt to rotate the alternator's rotor assembly."
    },
    {
      id: 66,
      type: 'single',question: "Ignition System Parts: High tension cords",
      options: ["Low voltage wires", "Insulated cables carrying high voltage to spark plugs", "Ground wires", "Battery cables"],
      correct: 1,
      explanation: "High tension cords (spark plug wires) carry high voltage from the distributor to the spark plugs."
    },
    {
      id: 67,
      type: 'single',question: "Ignition System Parts: Spark plug",
      options: ["Voltage regulator", "Creates spark to ignite air-fuel mixture", "Distributes voltage", "Stores energy"],
      correct: 1,
      explanation: "The spark plug creates the electrical spark that ignites the compressed air-fuel mixture."
    },
    {
      id: 68,
      type: 'single',question: "Ignition System Parts: Capacitor",
      options: ["Stores charge and prevents point arcing", "Generates voltage", "Distributes current", "Regulates timing"],
      correct: 0,
      explanation: "The capacitor (condenser) absorbs voltage spikes and prevents arcing at the breaker points."
    },
    {
      id: 69,
      type: 'single',question: "Ignition System Parts: Breaker points",
      options: ["Spark plugs", "Mechanical switch that triggers ignition coil", "Voltage regulator", "Distributor cap"],
      correct: 1,
      explanation: "Breaker points are mechanical contacts that open and close to control ignition coil primary current."
    },
    {
      id: 70,
      type: 'single',question: "Ignition System Parts: Cam",
      options: ["Rotates distributor cap", "Lobed shaft that opens breaker points", "Holds rotor", "Advances timing"],
      correct: 1,
      explanation: "The cam has lobes that push on the breaker points to open them at the correct timing."
    },
    {
      id: 71,
      type: 'single',question: "Ignition System Parts: Vacuum advancer",
      options: ["Mechanical advance", "Adjusts timing based on engine load/vacuum", "Opens breaker points", "Distributes voltage"],
      correct: 1,
      explanation: "The vacuum advancer adjusts ignition timing based on engine load by responding to intake manifold vacuum."
    },
    {
      id: 72,
      type: 'single',question: "Ignition System Parts: Governor advancer",
      options: ["Vacuum operated", "Centrifugal mechanism that advances timing with RPM", "Electronic control", "Voltage regulator"],
      correct: 1,
      explanation: "The governor (centrifugal) advancer uses rotating weights to advance timing as engine speed increases."
    },
    {
      id: 73,
      type: 'single',question: "Ignition System Parts: Ignition coil",
      options: ["Distributes voltage", "Transforms low voltage to high voltage", "Creates spark", "Regulates current"],
      correct: 1,
      explanation: "The ignition coil is a transformer that steps up battery voltage to the high voltage needed for spark plugs."
    },
    {
      id: 74,
      type: 'single',question: "Ignition System Parts: Resistor",
      options: ["Stores energy", "Limits current flow to protect ignition components", "Generates voltage", "Distributes current"],
      correct: 1,
      explanation: "The resistor limits current flow through the ignition coil primary circuit to prevent overheating."
    },
    {
      id: 75,
      type: 'single',question: "Ignition System Parts: Battery",
      options: ["Generates electricity", "Provides electrical power for ignition system", "Regulates voltage", "Distributes current"],
      correct: 1,
      explanation: "The battery supplies the electrical power needed to operate the ignition system."
    },
    {
      id: 76,
      type: 'single',question: "Ignition System Parts: Ignition switch",
      options: ["Spark plug", "Controls power to ignition system", "Distributor", "Coil"],
      correct: 1,
      explanation: "The ignition switch controls electrical power flow to the ignition system and other vehicle systems."
    },
    {
      id: 77,
      type: 'single',question: "Ignition System Parts: Sensors",
      options: ["Spark plugs", "Provide input signals for electronic ignition control", "Batteries", "Switches"],
      correct: 1,
      explanation: "Sensors (crankshaft position, camshaft position, etc.) provide timing and position information to the ECU."
    },
    {
      id: 78,
      type: 'single',question: "Ignition System Parts: ECU (Engine Control Unit)",
      options: ["Mechanical distributor", "Computer that controls ignition timing electronically", "Battery", "Alternator"],
      correct: 1,
      explanation: "The ECU is the computer that processes sensor inputs and controls ignition timing in modern systems."
    },
    {
      id: 79,
      type: 'single',question: "Ignition System Parts: Igniter",
      options: ["Spark plug", "Electronic switching device for ignition coil", "Battery", "Distributor"],
      correct: 1,
      explanation: "The igniter is an electronic module that switches the ignition coil primary current on and off."
    },
    {
      id: 80,
      type: 'single',question: "Ignition System Parts: Ignition Coil (in DIS)",
      options: ["Single coil for all cylinders", "Individual coils for each cylinder or pair", "Mechanical distributor", "Voltage regulator"],
      correct: 1,
      explanation: "In Direct Ignition Systems (DIS), individual coils are used for each cylinder or cylinder pair, eliminating the distributor."
    }
  ];

  // Shuffle questions on mount
  useEffect(() => {
    const shuffled = [...questions].map(q => {
      // Create array of option indices
      const indices = q.options.map((_, i) => i);
      // Shuffle indices
      const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
      
      // Create shuffled options
      const shuffledOptions = shuffledIndices.map(i => q.options[i]);
      
      // Map correct answer(s) to new positions
      let newCorrect;
      if (q.type === 'multiple') {
        // For multiple choice, map each correct index to its new position
        newCorrect = q.correct.map(correctIdx => 
          shuffledIndices.indexOf(correctIdx)
        ).sort((a, b) => a - b);
      } else {
        // For single choice, find new position of correct answer
        newCorrect = shuffledIndices.indexOf(q.correct);
      }
      
      return {
        ...q,
        options: shuffledOptions,
        correct: newCorrect,
        originalCorrect: q.correct // Keep original for reference
      };
    }).sort(() => Math.random() - 0.5);
    
    setShuffledQuestions(shuffled);
  }, []);

  const handleAnswerSelect = (answerIndex) => {
    const currentQ = shuffledQuestions[currentQuestion];
    
    if (currentQ.type === 'multiple') {
      // Multi-select logic
      if (showExplanation) return;
      
      const newSelected = selectedAnswers.includes(answerIndex)
        ? selectedAnswers.filter(i => i !== answerIndex)
        : [...selectedAnswers, answerIndex].sort((a, b) => a - b);
      
      setSelectedAnswers(newSelected);
    } else {
      // Single select logic
      if (!showExplanation) {
        setSelectedAnswer(answerIndex);
        setShowExplanation(true);
        setUserAnswers([...userAnswers, {
          questionId: currentQ.id,
          selected: answerIndex,
          correct: currentQ.correct,
          type: 'single'
        }]);
      }
    }
  };

  const handleSubmitMultiple = () => {
    const currentQ = shuffledQuestions[currentQuestion];
    setShowExplanation(true);
    setUserAnswers([...userAnswers, {
      questionId: currentQ.id,
      selected: selectedAnswers,
      correct: currentQ.correct,
      type: 'multiple'
    }]);
  };

  const handleNext = () => {
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setSelectedAnswers([]);
      setShowExplanation(false);
    } else {
      setIsComplete(true);
    }
  };

  const calculateScore = () => {
    const correct = userAnswers.filter(a => {
      if (a.type === 'multiple') {
        return JSON.stringify(a.selected.sort()) === JSON.stringify(a.correct.sort());
      }
      return a.selected === a.correct;
    }).length;
    return {
      correct,
      total: userAnswers.length,
      percentage: ((correct / userAnswers.length) * 100).toFixed(1)
    };
  };

  const handleRestart = () => {
    const shuffled = [...questions].map(q => {
      // Create array of option indices
      const indices = q.options.map((_, i) => i);
      // Shuffle indices
      const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
      
      // Create shuffled options
      const shuffledOptions = shuffledIndices.map(i => q.options[i]);
      
      // Map correct answer(s) to new positions
      let newCorrect;
      if (q.type === 'multiple') {
        // For multiple choice, map each correct index to its new position
        newCorrect = q.correct.map(correctIdx => 
          shuffledIndices.indexOf(correctIdx)
        ).sort((a, b) => a - b);
      } else {
        // For single choice, find new position of correct answer
        newCorrect = shuffledIndices.indexOf(q.correct);
      }
      
      return {
        ...q,
        options: shuffledOptions,
        correct: newCorrect,
        originalCorrect: q.correct
      };
    }).sort(() => Math.random() - 0.5);
    
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setUserAnswers([]);
    setIsComplete(false);
    setIsRetakeWrong(false);
  };

  const handleRetakeWrong = () => {
    const wrongAnswers = userAnswers.filter(a => {
      if (a.type === 'multiple') {
        return JSON.stringify(a.selected.sort()) !== JSON.stringify(a.correct.sort());
      }
      return a.selected !== a.correct;
    });
    const wrongQuestions = questions.filter(q => 
      wrongAnswers.some(wa => wa.questionId === q.id)
    ).map(q => {
      // Shuffle options for retake
      const indices = q.options.map((_, i) => i);
      const shuffledIndices = [...indices].sort(() => Math.random() - 0.5);
      const shuffledOptions = shuffledIndices.map(i => q.options[i]);
      
      let newCorrect;
      if (q.type === 'multiple') {
        newCorrect = q.correct.map(correctIdx => 
          shuffledIndices.indexOf(correctIdx)
        ).sort((a, b) => a - b);
      } else {
        newCorrect = shuffledIndices.indexOf(q.correct);
      }
      
      return {
        ...q,
        options: shuffledOptions,
        correct: newCorrect,
        originalCorrect: q.correct
      };
    });
    
    setShuffledQuestions(wrongQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setUserAnswers([]);
    setIsComplete(false);
    setIsRetakeWrong(true);
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading quiz...</div>
      </div>
    );
  }

  if (isComplete) {
    const score = calculateScore();
    const wrongCount = userAnswers.filter(a => {
      if (a.type === 'multiple') {
        return JSON.stringify(a.selected.sort()) !== JSON.stringify(a.correct.sort());
      }
      return a.selected !== a.correct;
    }).length;

    return (
      <div className="completion-container">
        <div className="completion-card">
          <h1 className="completion-title">Quiz Complete!</h1>
          <div className="completion-score">{score.percentage}%</div>
          <p className="completion-percentage">
            You got {score.correct} out of {score.total} questions correct
          </p>
          <p className="completion-message">
            {score.percentage >= 75 
              ? "Great job! You passed!" 
              : "Keep studying! You can do better!"}
          </p>

          {wrongCount > 0 && (
            <div className="wrong-answers-alert">
              <div className="wrong-answers-header">
                <AlertCircle size={20} />
                <span>You got {wrongCount} question{wrongCount !== 1 ? 's' : ''} wrong</span>
              </div>
              <p className="wrong-answers-text">
                Review the questions you missed and try again!
              </p>
            </div>
          )}

          <div className="completion-buttons">
            <button onClick={handleRestart} className="restart-button">
              <RotateCcw size={20} />
              Retake Full Quiz
            </button>
            {wrongCount > 0 && (
              <button onClick={handleRetakeWrong} className="retake-wrong-button">
                <AlertCircle size={20} />
                Retake Wrong Answers ({wrongCount})
              </button>
            )}
            <button onClick={onBackToHome} className="restart-button">
              <Home size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentQuestion];
  const isCorrect = selectedAnswer === currentQ.correct;

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <button onClick={onBackToHome} className="back-home-button">
          <Home size={18} />
          Back to Home
        </button>

        <div className="quiz-header">
          {isRetakeWrong && (
            <div className="wrong-answers-alert" style={{ marginBottom: '1rem' }}>
              <div className="wrong-answers-header">
                <AlertCircle size={20} />
                <span>Retaking wrong answers only</span>
              </div>
            </div>
          )}

          <div className="quiz-progress-info">
            <span className="question-badge">
              Question {currentQuestion + 1} of {shuffledQuestions.length}
            </span>
            <span className="score-text">
              Answered: {userAnswers.length} / {shuffledQuestions.length}
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="question-section">
          <h2 className="question-text">{currentQ.question}</h2>
          
          {currentQ.type === 'multiple' && !showExplanation && (
            <div style={{ 
              background: '#fef3c7', 
              padding: '0.75rem', 
              borderRadius: '0.5rem', 
              marginBottom: '1rem',
              fontSize: '0.875rem',
              color: '#92400e',
              fontWeight: '500'
            }}>
              ✓ Select {currentQ.correct.length} answers - Click Submit when ready
            </div>
          )}
          
          <div className="options-container">
            {currentQ.options.map((option, index) => {
              let isSelected, isCorrectOption, buttonClass;
              
              if (currentQ.type === 'multiple') {
                isSelected = selectedAnswers.includes(index);
                isCorrectOption = currentQ.correct.includes(index);
                
                buttonClass = 'option-button';
                if (showExplanation) {
                  if (isCorrectOption) buttonClass += ' correct';
                  else if (isSelected && !isCorrectOption) buttonClass += ' incorrect';
                } else if (isSelected) {
                  buttonClass += ' selected';
                }
              } else {
                isSelected = selectedAnswer === index;
                isCorrectOption = index === currentQ.correct;
                
                buttonClass = 'option-button';
                if (showExplanation) {
                  if (isSelected && isCorrect) buttonClass += ' correct';
                  else if (isSelected && !isCorrect) buttonClass += ' incorrect';
                  else if (isCorrectOption) buttonClass += ' correct';
                } else if (isSelected) {
                  buttonClass += ' selected';
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={buttonClass}
                  disabled={showExplanation}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                    {currentQ.type === 'multiple' && (
                      <div style={{ flexShrink: 0 }}>
                        {isSelected ? (
                          <CheckSquare size={20} color="#4f46e5" />
                        ) : (
                          <Square size={20} color="#9ca3af" />
                        )}
                      </div>
                    )}
                    <span className="option-text">{option}</span>
                  </div>
                  {showExplanation && (
                    <>
                      {currentQ.type === 'single' && (
                        <>
                          {isSelected && isCorrect && <CheckCircle size={24} color="#10b981" />}
                          {isSelected && !isCorrect && <XCircle size={24} color="#ef4444" />}
                          {!isSelected && isCorrectOption && <CheckCircle size={24} color="#10b981" />}
                        </>
                      )}
                      {currentQ.type === 'multiple' && (
                        <>
                          {isCorrectOption && <CheckCircle size={24} color="#10b981" />}
                          {isSelected && !isCorrectOption && <XCircle size={24} color="#ef4444" />}
                        </>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <div className={`explanation-box ${
              currentQ.type === 'multiple' 
                ? (JSON.stringify(selectedAnswers.sort()) === JSON.stringify(currentQ.correct.sort()) ? 'correct' : 'incorrect')
                : (isCorrect ? 'correct' : 'incorrect')
            }`}>
              <p className="explanation-title">Explanation:</p>
              <p className="explanation-text">{currentQ.explanation}</p>
            </div>
          )}
        </div>

        {currentQ.type === 'multiple' && !showExplanation ? (
          <button
            onClick={handleSubmitMultiple}
            className={`next-button ${selectedAnswers.length > 0 ? 'enabled' : 'disabled'}`}
            disabled={selectedAnswers.length === 0}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`next-button ${showExplanation ? 'enabled' : 'disabled'}`}
            disabled={!showExplanation}
          >
            {currentQuestion < shuffledQuestions.length - 1 ? (
              <>
                Next Question
                <ArrowRight size={20} />
              </>
            ) : (
              'Finish Quiz'
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default EngineElectricalQuiz;
  