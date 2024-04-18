import React from "react";

export default function About() {
  return (
    <div className="py-14 px-4 max-w-6xl  mx-auto">
      <h1 className="text-3xl text-center font-bold mb-10 ">Кто мы?</h1>
      <section className="flex text-center m-15 items-center">
      <img
      className="h-72 w-2/5 rounded-xl object-cover object-center"
      src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiJm0ep2XnY1hTuKtavEkI-pgnDTESIyCgaaJghzSe0tj_nYjZ4gxXSpu_dvQ3_FjqUbjj2zpiowxhMFxDO9xULKcitFENvdgHQxBO3Lek8a5v4oLN8spywI2-lyUtyVUJruQc4vN1IILHwOxBj8bHWhA0o-SJBP-IbZ8bSBttHJzGMjKvbIkUHF1G1fg/s2784/Rangiora%20real%20estate%201.jpg"
      alt="nature image"
    />
      <p className=" p-8 text-sm sm:text-xl text-slate-800">
        Агентство недвижимости, которое специализируется на помощи клиентам в
        покупке, продаже и аренде недвижимости в самых привлекательных районах.
        Наша команда опытных агентов стремится предоставить исключительный
        сервис и сделать процесс покупки и продажи максимально простым.
      </p>
      </section>
      <section className="flex text-center items-center">
      <p className="p-8 text-sm sm:text-xl text-slate-800">
        Наша миссия — помочь нашим клиентам достичь своих целей в сфере
        недвижимости, предоставляя экспертные консультации, индивидуальное
        обслуживание и глубокое понимание местного рынка. Если вы хотите купить,
        продать или арендовать недвижимость, мы здесь, чтобы помочь вам на
        каждом этапе пути.
      </p>
      <img
      className="h-72 w-2/5 rounded-xl object-cover object-center"
      src="https://msk.kprf.ru/wp-content/uploads/2022/03/71066_1.jpg"
      alt="nature image"
    />
      </section>
      <section className="flex text-center items-center">
      <img
      className="h-72 w-2/5 rounded-xl object-cover object-center"
      src="https://s0.rbk.ru/v6_top_pics/media/img/3/47/756577467560473.jpg"
      alt="nature image"
    />
      <p className=" p-10 text-sm sm:text-xl text-slate-800">
        Наша команда агентов имеет богатый опыт и знания в сфере недвижимости, и
        мы стремимся обеспечить самый высокий уровень обслуживания наших
        клиентов. Мы считаем, что покупка или продажа недвижимости должна быть
        захватывающим и полезным опытом, и мы стремимся сделать это реальностью
        для каждого из наших клиентов.
      </p>
      </section>
    </div>
  );
}
