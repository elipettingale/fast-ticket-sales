export function formData(form: any) {
  let formData = new FormData(form);
  let data: any = {};

  for (const [key, value] of formData) {
    data[key] = value;
  }

  return data;
}

export function formDataAsJson(form: any) {
  let formData = new FormData(form);

  let data: any = {};

  for (const [key, value] of formData) {
    if (key.includes("[")) {
      let splitKey = key.slice(0, -1).split("[");

      if (typeof data[splitKey[0]] === "undefined") {
        data[splitKey[0]] = {};
      }

      data[splitKey[0]][splitKey[1]] = value;
    } else {
      data[key] = value;
    }
  }

  return data;
}

export function clone(data: any) {
  return JSON.parse(JSON.stringify(data));
}

export function timeRemaining(end: any) {
  const now = new Date().getTime();
  return Math.max(end - now, 0);
}

export function BEM(styles: any, root: string, modifiers: object) {
  let className = styles[root] ?? "";

  Object.entries(modifiers).forEach(([modifier, shouldApply]) => {
    if (!shouldApply) return;
    className += " " + styles[`${root}--${modifier}`];
  });

  return className;
}

export function getPrice(context: ContextType) {
  return context.basket.reduce((n: any, event: any) => {
    return n + event.price;
  }, 0);
}

export function displayPrice(number: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(number / 100);
}

export function isOverFifteen(day: any, month: any, year: any) {
  const birthDate = new Date(`${month}/${day}/${year}`);

  const currentDate = new Date();
  const ageDifference = currentDate.getFullYear() - birthDate.getFullYear();

  const hasBirthdayOccurred =
    currentDate.getMonth() > birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() &&
      currentDate.getDate() >= birthDate.getDate());

  return ageDifference > 16 || (ageDifference === 16 && hasBirthdayOccurred);
}

export function getSalesStatus()
{
  let now = new Date().toISOString();
  let open = import.meta.env.VITE_SALES_OPEN;
  let close = import.meta.env.VITE_SALES_CLOSE;

  if (open > now) {
    return 'pre-open';
  }

  if (open < now && close > now) {
    return 'open';
  }

  return 'closed';
}
