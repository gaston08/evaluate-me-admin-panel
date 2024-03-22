import { /*format, getTime,*/ formatDistanceToNow } from 'date-fns';
/*
export function fDate(date: Date | null, newFormat: string): string {
  const fm: string = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date: Date | null, newFormat: string): string {
  const fm: string = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date: Date | null): string {
  return date ? getTime(new Date(date)) : '';
}
*/
export function fToNow(date: Date | null): string {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}
