interface Props {
  element1: string
  element2: string
  element1Relation: string
  handleChange: (val: string) => void
}

export const Element2Details: React.FC<Props> = (props: Props) => {
  return (
    <select
      className="select mx-2"
      onChange={(e) => props.handleChange(e.target.value)}
      value={props.element2}
    >
      <option
        value={['location-negation', 'location'].includes(props.element1Relation!) ? 'L1' : 'W1'}
      >
        {['location-negation', 'location'].includes(props.element1Relation!) ? 'L1' : 'W1'}
      </option>
      <option
        value={['location-negation', 'location'].includes(props.element1Relation!) ? 'L2' : 'W2'}
      >
        {['location-negation', 'location'].includes(props.element1Relation!) ? 'L2' : 'W2'}
      </option>
      <option
        value={['location-negation', 'location'].includes(props.element1Relation!) ? 'L3' : 'W3'}
      >
        {['location-negation', 'location'].includes(props.element1Relation!) ? 'L3' : 'W3'}
      </option>
    </select>
  )
}
