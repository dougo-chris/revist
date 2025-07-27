import links from '@/../content/links.yaml'

export async function getLinksGroupedBy(groupBy) {
  return links.reduce((acc, item) => {
    const { title, tag, date, description = null, href } = item;

    const dateObj = new Date(date);
    const [year, month] = [dateObj.getFullYear(), dateObj.getMonth() + 1];
    const groupKey = groupBy === 'date' ? `${year}-${month.toString().padStart(2, '0')}` : tag;

    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }

    acc[groupKey].push({ title, tag, date, description, href });

    return acc;
  }, {});
}
