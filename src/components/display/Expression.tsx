interface Props {
  expression: any;
  className?: string;
}

const Expression = ({ expression, className }: Props) => {
  return <div className={className}>{expression.join(" ")}</div>;
};

export default Expression;
