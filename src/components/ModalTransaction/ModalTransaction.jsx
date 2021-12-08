import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//селекторы
import { financeSelectors } from 'redux/finance';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
//дата
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
//иконка
import { ReactComponent as DateIcon } from 'icons/date-icon.svg';
import { ReactComponent as CrossIcon } from 'icons/cross-close.svg';
//сумма
import NumberFormat from 'react-number-format';
//чекбокс
import { Checkbox } from 'components/Checkbox';
import style from './ModalTransaction.module.css';
//селект
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './GlobalCssSlider.css';
//кнопка
import { ButtonWindow } from 'components/ButtonWindow';
//модалка
import { fetchTransactionOperation } from 'redux/finance';
import { useDispatch, useSelector } from 'react-redux';
import { modalAction } from 'redux/modal';

//нормализация даты

const validation = Yup.object({
  transactionType: Yup.boolean(),
  // category: Yup.number()
  //   .min(1, 'Выбери категорию от 1 до 7 ')
  //   .when('type_pay', {
  //     is: false,
  //     then: Yup.number().min(0),
  //   }),

  category: Yup.mixed()
    .notOneOf(['Выберите категорию'], 'Выберите категорию')
    .when('transactionType', {
      is: false,
      then: Yup.mixed().oneOf([
        'Выберите категорию',
        '61ad865bc505a94bdf06939f',
        '61ad8719c505a94bdf0693a0',
        '61ad87a7c505a94bdf0693a2',
        '61ad8892c505a94bdf0693a4',
        '61ad881ac505a94bdf0693a3',
        '61ad8aadc505a94bdf0693a5',
        '61ad8b50c505a94bdf0693a7',
      ]),
    }),

  sum: Yup.number()
    .min(0.01, 'Минимальная сумма 0.01')
    .max(999999999, 'Максимальная сумма 999 999 999')
    .required('Минимальная сумма 0.01'),
  date: Yup.date().required(),
  discription: Yup.mixed(),
});

//приводит дату в нормальный формат
const norlmalizeData = value => {
  const normalizeFormatMonth =
    value.getMonth() < 10 ? '0' + (value.getMonth() + 1) : value.getMonth() + 1;

  const normalizeFormatDate =
    value.getDate() < 10 ? '0' + value.getDate() : value.getDate();
  const normalizeDate = [
    normalizeFormatMonth,
    normalizeFormatDate,
    value.getFullYear(),
  ].join('.');
  return normalizeDate;
};

export const ModalTransaction = () => {
  const dispatch = useDispatch();
  const isError = useSelector(financeSelectors.getIsError);
  const errorMessage = useSelector(financeSelectors.getErrorMessage);

  const handleClick = () => {
    dispatch(modalAction.closeModal());
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [errorMessage, isError]);

  const formik = useFormik({
    initialValues: {
      transactionType: true,
      sum: '',
      date: new Date(),
      category: 'Выберите категорию',
      comment: '',
    },
    validationSchema: validation,

    onSubmit: (values, { resetForm }) => {
      values.sum = Number(values.sum);
      values.date = norlmalizeData(values.date);

      if (!values.transactionType) delete values.category;
      if (!values.comment) delete values.comment;

      dispatch(fetchTransactionOperation(values));

      resetForm();
    },
  });

  let inputDateProps = {
    id: 'date',
    name: 'date',
    className: style.Modal__date,
  };
  return (
    <div className={style.Modal}>
      {isError && <ToastContainer />}
      <h1 className={style.Modal__title}>Добавить транзакцию</h1>
      <form onSubmit={formik.handleSubmit} className={style.Modal__form}>
        <div className={style.Modal__type}>
          <Checkbox
            id="transactionType"
            name="transactionType"
            type="checkbox"
            checked={formik.values.transactionType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.transactionType}
          />
          <label
            className={[
              style.Model__label,
              !formik.values.transactionType && style.Modal__income,
            ].join(' ')}
            htmlFor="transactionType"
          >
            Доход
          </label>
          <label
            htmlFor="transactionType"
            className={[
              style.Model__label,
              formik.values.transactionType && style.Modal__expenses,
            ].join(' ')}
          >
            Расход
          </label>
        </div>

        {formik.values.transactionType && (
          <div className={style.Modal__wrapperSelect}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 280 }}>
              <Select
                id="category"
                value={formik.values.category}
                name="category"
                onChange={formik.handleChange}
                className={[style.Modal__input, style.Modal__category].join(
                  ' ',
                )}
              >
                <MenuItem disabled value="Выберите категорию">
                  Выберите категорию
                </MenuItem>

                <MenuItem value="61ad865bc505a94bdf06939f">Основной</MenuItem>
                <MenuItem value="61ad87a7c505a94bdf0693a2">Еда</MenuItem>
                <MenuItem value="61ad881ac505a94bdf0693a3">Авто</MenuItem>
                <MenuItem value="61ad8b50c505a94bdf0693a7">Развитие</MenuItem>
                <MenuItem value="61ad8719c505a94bdf0693a0">Дети</MenuItem>
                <MenuItem value="61ad8892c505a94bdf0693a4">Дом</MenuItem>
                <MenuItem value="61ad8aadc505a94bdf0693a5">
                  Образование
                </MenuItem>
                <MenuItem value="Остальное">Остальное</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.category && formik.errors.category ? (
              <div className={style.Modal__errorSelect}>
                {formik.errors.category}
              </div>
            ) : null}
          </div>
        )}

        <div className={style.Modal__wrapperAmountDate}>
          <div className={style.Modal__wrapperAmount}>
            <NumberFormat
              id="sum"
              name="sum"
              className={[style.Modal__input, style.Modal__amount].join(' ')}
              thousandSeparator={true}
              autoComplete="off"
              placeholder="0.00"
              displayType="input"
              type="text"
              value={formik.values.sum}
              allowNegative={true}
              defaultValue={0}
              isNumericString={true}
              onValueChange={(values, sourceInfo) => {
                const e = {
                  target: {
                    value: values.value,
                    id: 'sum',
                    name: 'sum',
                  },
                };

                formik.handleChange(e);
              }}
              thousandsGroupStyle="thousand"
            />
            {formik.touched.sum && formik.errors.sum ? (
              <div className={style.Modal__errorAmount}>
                {formik.errors.sum}
              </div>
            ) : null}
          </div>

          <div
            className={[
              style.Modal__input,
              style.Modal__input__boxRelative,
            ].join(' ')}
          >
            <DateIcon
              width="18"
              height="20"
              className={style.Modal__iconDate}
            />
            <Datetime
              dateFormat="DD.MM.YYYY"
              timeFormat={false}
              inputProps={inputDateProps}
              initialValue={formik.values.date}
              closeOnSelect={true}
            />
          </div>
        </div>

        <textarea
          id="comment"
          className={[style.Modal__input, style.Modal__input__hight].join(' ')}
          name="comment"
          rows="2"
          maxLength="60"
          placeholder="Комментарий"
          autoComplete="off"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
        ></textarea>
        {formik.touched.comment && formik.errors.comment ? (
          <div>{formik.errors.comment}</div>
        ) : null}

        <ButtonWindow
          className={style.Modal__button}
          title={'добавить'}
          action={'добавить'}
        />
      </form>
      <ButtonWindow onClick={handleClick} title={'отмена'} />
      <CrossIcon onClick={handleClick} className={style.Modal__close} />
    </div>
  );
};
