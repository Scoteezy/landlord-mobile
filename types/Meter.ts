export type Meter = {
  date: string; // тип для даты можно использовать строку
  rent: {
    price: number; // цена аренды - число (предположительно в рублях)
    isPayed: boolean; // флаг, оплачена ли аренда
  };
  water: {
    meters: number; // показания счетчика воды
    price: number; // цена за воду
    isPayed: boolean; // флаг, оплачены ли счета за воду
  };
  elec: {
    meters: number; // показания счетчика электроэнергии
    price: number; // цена за электроэнергию
    isPayed: boolean; // флаг, оплачены ли счета за электроэнергию
  };
  ethernet: {
    price: number; // цена за интернет
    isPayed: boolean; // флаг, оплачен ли интернет
  };
};
