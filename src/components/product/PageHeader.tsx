import { Box, Typography } from '@material-ui/core';
import Link from 'next/link';
import { ICategory } from '~/interfaces/category';
import { ICar } from '~/interfaces/ICar';
import url from '~/services/url';

interface IProps {
  categories: ICategory[];
  model: ICar;
}

export default function PageHeader({ categories, model }: IProps) {
  const makeSlug: string = model.make.slug;
  const modelSlug: string = model.slug;

  return (
    <Box>
      {categories.map((cat: ICategory) => {
        return (
          <span key={cat.id}>
            <Typography variant="h5">
              First Level - {cat.name} ({cat.count})
            </Typography>
            {cat.children?.map((subcat: ICategory) => {
              return (
                <div key={subcat.id} style={{ paddingLeft: '2rem' }}>
                  <Typography variant="body1">
                    <Link href={url.category(makeSlug, modelSlug, subcat.slug)}>
                      <a>
                        {subcat.name} ({subcat.count})
                      </a>
                    </Link>
                  </Typography>
                </div>
              );
            })}
          </span>
        );
      })}
    </Box>
  );
}
