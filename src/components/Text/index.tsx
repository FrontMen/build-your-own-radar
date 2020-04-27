import React from 'react';
import { useTranslation } from 'react-i18next';

type PropTypes = {
  tag?: React.ElementType;
  value?: string;
};

export const Text = ({ tag, value }: PropTypes) => {
  const { t } = useTranslation();
  const Tag: React.ElementType = tag || 'span';

  return <Tag>{t(value || '')}</Tag>;
};
