idf_component_register(
    SRCS main.cpp
    INCLUDE_DIRS "."
)
set_target_properties(${COMPONENT_LIB} PROPERTIES COMPILE_FLAGS -w)
