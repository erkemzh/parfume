import React, { useState } from 'react';
import { Perfume, OlfactoryFamily, PerfumeSeason } from '../types/perfume';
import { Sparkles, X, RotateCcw, ShoppingBag, Eye } from 'lucide-react';

interface SommelierQuizModalProps {
  perfumes: Perfume[];
  onClose: () => void;
  onSelectPerfume: (perfume: Perfume) => void;
  onAddToCart: (perfume: Perfume) => void;
}

interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    icon: string;
    weights: {
      family?: OlfactoryFamily;
      accords?: string[];
      sillageMin?: number;
      season?: PerfumeSeason;
    };
  }[];
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Какое весеннее настроение вы хотите создать?',
    subtitle: 'Аромат раскрывает вашу женственность, нежность и вдохновение.',
    options: [
      {
        label: 'Нежная свежесть и умиротворение',
        description: 'Прованская лаванда, утренний ветерок, белые простыни и чистота.',
        icon: '🪻',
        weights: { family: 'fresh', accords: ['Лавандовый', 'Свежий', 'Мускусный'], sillageMin: 8 },
      },
      {
        label: 'Романтика и бархатная розовая вуаль',
        description: 'Капли утренней росы на лепестках майских роз, пионы и шелк.',
        icon: '🌸',
        weights: { family: 'floral', accords: ['Розовый', 'Цветочный'], sillageMin: 9 },
      },
      {
        label: 'Сливочный десертный уют и нега',
        description: 'Мадагаскарская ваниль, миндальное пралине и кремовый сандал.',
        icon: '🍦',
        weights: { family: 'gourmand', accords: ['Ванильный', 'Сливочный'], sillageMin: 8 },
      },
      {
        label: 'Пудровый аристократичный шик',
        description: 'Королевский ирис Паллида, рисовая пудра и светлая замша.',
        icon: '✨',
        weights: { family: 'woody', accords: ['Пудровый', 'Древесный'], sillageMin: 8 },
      },
    ],
  },
  {
    id: 2,
    question: 'Какая цветочная атмосфера вас вдохновляет?',
    subtitle: 'Окружение формирует ваше восприятие аромата.',
    options: [
      {
        label: 'Лавандовые террасы Прованса на рассвете',
        description: 'Горный воздух, цветущие сиреневые холмы и утреннее солнце.',
        icon: '💜',
        weights: { season: 'spring', accords: ['Лавандовый', 'Свежий'] },
      },
      {
        label: 'Розарий в замке Долины Луары',
        description: 'Цветущие чайные розы, прохладная мраморная беседка и фонтаны.',
        icon: '🌹',
        weights: { season: 'summer', accords: ['Розовый', 'Цветочный'] },
      },
      {
        label: 'Парижская кондитерская на Сен-Жермен',
        description: 'Ванильные бриоши, крем-брюле и чашечка нежного кофе со сливками.',
        icon: '🥐',
        weights: { season: 'autumn', accords: ['Ванильный', 'Сливочный'] },
      },
      {
        label: 'Зимний сад с цветущими белыми камелиями',
        description: 'Хрустальная чистота, белый жасмин и кашемировое тепло.',
        icon: '❄️',
        weights: { season: 'winter', accords: ['Пудровый', 'Мускусный'] },
      },
    ],
  },
  {
    id: 3,
    question: 'Какие аккорды вызывают у вас наибольшее наслаждение?',
    subtitle: 'Физиологический отклик на ключевые природные экстракты.',
    options: [
      {
        label: 'Французская горная лаванда и бергамот',
        description: 'Кристально чистый фужерный старт с легкой травяной сладостью.',
        icon: '🪻',
        weights: { family: 'fresh', accords: ['Лавандовый', 'Свежий'] },
      },
      {
        label: 'Майская роза Грасса и белый пион',
        description: 'Нежный, шелковистый, пьянящий женственный букет.',
        icon: '🌺',
        weights: { family: 'floral', accords: ['Розовый', 'Цветочный'] },
      },
      {
        label: 'Мадагаскарская бурбонская ваниль и сандал',
        description: 'Гурманская теплая вуаль, мягкая как взбитые сливки.',
        icon: '🍦',
        weights: { family: 'gourmand', accords: ['Ванильный', 'Сливочный'] },
      },
      {
        label: 'Ирис, белая сирень и рисовая пудра',
        description: 'Утонченная дымчатая пудра высшего света.',
        icon: '💮',
        weights: { family: 'woody', accords: ['Пудровый', 'Цветочный'] },
      },
    ],
  },
  {
    id: 4,
    question: 'Какой шлейф вы предпочитаете для себя?',
    subtitle: 'Как ваш аромат должен окутывать пространство вокруг.',
    options: [
      {
        label: 'Царственный цветочный шлейф — заметен издалека',
        description: 'Шлейфит роскошным облаком при каждом движении.',
        icon: '💫',
        weights: { sillageMin: 9 },
      },
      {
        label: 'Элегантный нежный ореол — слышен при объятиях',
        description: 'Тактичный и утонченный шлейф на расстоянии вытянутой руки.',
        icon: '✨',
        weights: { sillageMin: 7 },
      },
      {
        label: 'Интимный шелковый кокон «второй кожи»',
        description: 'Ощущается только вами и самыми близкими людьми.',
        icon: '🤍',
        weights: { sillageMin: 5 },
      },
    ],
  },
  {
    id: 5,
    question: 'Для какого повода вы подбираете парфюм?',
    subtitle: 'Контекст раскрывает задумку парфюмера.',
    options: [
      {
        label: 'Каждый день — подчеркнуть легкую нежность и чистоту',
        description: 'Идеален для прогулок, работы, дома и встреч за чаем.',
        icon: '🕊️',
        weights: { accords: ['Лавандовый', 'Свежий', 'Цветочный'] },
      },
      {
        label: 'Романтические свидания и комплименты',
        description: 'Манящие розы, пионы и притягательная ваниль.',
        icon: '💌',
        weights: { accords: ['Розовый', 'Ванильный'] },
      },
      {
        label: 'Свадьбы, весенние рауты и светские приемы',
        description: 'Торжественный, сияющий, королевский цветочный флер.',
        icon: '👑',
        weights: { accords: ['Цветочный', 'Пудровый', 'Лавандовый'] },
      },
    ],
  },
];

export const SommelierQuizModal: React.FC<SommelierQuizModalProps> = ({
  perfumes,
  onClose,
  onSelectPerfume,
  onAddToCart,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [isCalculated, setIsCalculated] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = optionIndex;
    setSelectedAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculated(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setIsCalculated(false);
  };

  // Calculate matching scores
  const rankedPerfumes = perfumes.map((perfume) => {
    let score = 50;

    selectedAnswers.forEach((ansIndex, qIdx) => {
      const q = QUIZ_QUESTIONS[qIdx];
      const opt = q.options[ansIndex];
      if (!opt) return;

      const { family, accords, sillageMin, season } = opt.weights;

      if (family && perfume.family === family) {
        score += 25;
      }

      if (accords) {
        accords.forEach((chord) => {
          if (perfume.accords[chord] && perfume.accords[chord] > 60) {
            score += 15;
          }
        });
      }

      if (sillageMin && perfume.performance.sillageScore >= sillageMin) {
        score += 10;
      }

      if (season && perfume.season.includes(season)) {
        score += 10;
      }
    });

    const matchPercent = Math.min(99, Math.max(84, Math.round((score / 150) * 100)));

    return {
      perfume,
      matchPercent,
    };
  }).sort((a, b) => b.matchPercent - a.matchPercent);

  const topMatch = rankedPerfumes[0];
  const runnersUp = rankedPerfumes.slice(1, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-purple-950/40 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-3xl bg-white border border-purple-200 shadow-2xl overflow-hidden text-[#26232E] flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-purple-100 flex items-center justify-between bg-purple-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-white text-purple-600 border border-purple-200 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#26232E]">
                Parfum AI-Match · Цветочный онлайн-сомелье
              </h2>
              <p className="text-xs text-[#6E6A7A] font-sans">
                Индивидуальный подбор аромата по нежным лепесткам и нотам
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          {!isCalculated ? (
            /* Quiz Questions View */
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#7A7485] font-sans">
                  <span>Вопрос {currentStep + 1} из {QUIZ_QUESTIONS.length}</span>
                  <span className="text-purple-700 font-bold">
                    {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-purple-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-rose-400 transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              <div className="space-y-2 pt-2">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#26232E] leading-tight">
                  {QUIZ_QUESTIONS[currentStep].question}
                </h3>
                <p className="text-sm text-[#5E5968] font-sans">
                  {QUIZ_QUESTIONS[currentStep].subtitle}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => {
                  const isChosen = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 transition-all duration-200 cursor-pointer ${
                        isChosen
                          ? 'bg-purple-50 border-purple-400 shadow-sm'
                          : 'bg-white border-purple-100 hover:bg-purple-50/50 hover:border-purple-200'
                      }`}
                    >
                      <span className="text-2xl select-none shrink-0 pt-0.5">
                        {opt.icon}
                      </span>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-[#26232E] font-sans">
                          {opt.label}
                        </div>
                        <p className="text-xs text-[#6E6A7A] mt-1 font-sans leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Back / Navigation */}
              {currentStep > 0 && (
                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs text-purple-700 hover:text-purple-900 font-medium cursor-pointer"
                  >
                    ← Вернуться к предыдущему вопросу
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results View */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border border-purple-200 text-purple-900 text-xs font-sans uppercase font-bold tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Ваш цветочный код найден</span>
                </div>
                <h3 className="text-3xl font-serif font-bold text-[#26232E]">
                  Идеальное совпадение: {topMatch?.perfume.name}
                </h3>
                <p className="text-xs text-[#6E6A7A] font-sans max-w-md mx-auto">
                  Сомелье бутика подобрал композицию, которая гармонирует с вашим характером и стилем.
                </p>
              </div>

              {/* Top Winner Card */}
              {topMatch && (
                <div className="relative p-6 rounded-3xl bg-gradient-to-r from-purple-50/80 via-white to-rose-50/80 border border-purple-300 shadow-xl space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-5 aspect-[4/4.5] rounded-2xl overflow-hidden bg-white border border-purple-200 shadow-md">
                      <img
                        src={topMatch.perfume.image}
                        alt={topMatch.perfume.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="sm:col-span-7 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs uppercase tracking-widest text-purple-700 font-bold font-sans">
                          {topMatch.perfume.brand}
                        </span>
                        <div className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-bold tabular-nums">
                          {topMatch.matchPercent}% Совпадение
                        </div>
                      </div>

                      <h4 className="text-2xl font-serif font-bold text-[#26232E]">
                        {topMatch.perfume.name}
                      </h4>

                      <p className="text-xs text-[#5E5968] leading-relaxed font-sans">
                        {topMatch.perfume.description}
                      </p>

                      <div className="pt-2 text-xs text-[#6E6A7A] space-y-1">
                        <div>
                          Пирамида: <strong className="text-[#26232E]">{topMatch.perfume.notes.top[0]?.name}</strong>,{' '}
                          <strong className="text-[#26232E]">{topMatch.perfume.notes.heart[0]?.name}</strong>,{' '}
                          <strong className="text-[#26232E]">{topMatch.perfume.notes.base[0]?.name}</strong>
                        </div>
                        <div>
                          Шлейф: <strong className="text-rose-600">{topMatch.perfume.performance.sillageDescription}</strong>
                        </div>
                      </div>

                      <div className="pt-4 flex items-center gap-3">
                        <button
                          onClick={() => {
                            onClose();
                            onSelectPerfume(topMatch.perfume);
                          }}
                          className="px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-[#26232E] border border-purple-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <Eye className="w-4 h-4 text-purple-600" />
                          <span>Пирамида нот</span>
                        </button>

                        <button
                          onClick={() => {
                            onAddToCart(topMatch.perfume);
                            onClose();
                          }}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-rose-500 hover:opacity-95 text-white text-xs font-semibold shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Купить (от {topMatch.perfume.formats[0]?.price.toLocaleString('ru-RU')} ₽)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Runners up */}
              {runnersUp.length > 0 && (
                <div className="space-y-3">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#6E6A7A] font-sans">
                    Также рекомендуем попробовать:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {runnersUp.map((run) => (
                      <div
                        key={run.perfume.id}
                        onClick={() => {
                          onClose();
                          onSelectPerfume(run.perfume);
                        }}
                        className="p-3 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 transition-all flex items-center gap-3 cursor-pointer shadow-xs hover:shadow-md"
                      >
                        <img
                          src={run.perfume.image}
                          alt={run.perfume.name}
                          className="w-14 h-14 rounded-xl object-cover bg-purple-50 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="overflow-hidden flex-1">
                          <div className="flex items-center justify-between text-[10px] text-[#7A7485]">
                            <span className="uppercase font-semibold">{run.perfume.brand}</span>
                            <span className="text-purple-700 font-bold tabular-nums">{run.matchPercent}%</span>
                          </div>
                          <h6 className="text-sm font-serif font-bold text-[#26232E] truncate">
                            {run.perfume.name}
                          </h6>
                          <p className="text-[11px] font-serif text-rose-600 font-bold tabular-nums">
                            от {run.perfume.formats[0]?.price.toLocaleString('ru-RU')} ₽
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Retake test */}
              <div className="pt-4 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-xs text-purple-800 hover:text-purple-950 border border-purple-200 bg-white hover:bg-purple-50 flex items-center gap-2 cursor-pointer shadow-xs font-medium"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти тест заново</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
