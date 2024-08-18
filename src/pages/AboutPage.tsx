export const AboutPage: React.FC = () => {
  return (
    <>
      <div>
        <p className="text-xl">
          All problems from -
          <a href="https://murdle.com/book/" target="_blank" className="btn-link btn-primary p-2">
            Murdle
          </a>
        </p>
        <p className="text-xl">
          Github -
          <a
            href="https://github.com/rocky-jaiswal/murdle-solver"
            target="_blank"
            className="btn-link btn-primary p-2"
          >
            Murdle-Solver
          </a>
        </p>
        <p className="py-4">👨🏾‍💻: rocky.jaiswal (dot) gmail (dot) com</p>
      </div>
    </>
  )
}
